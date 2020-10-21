import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactionsModal from '../ReactionsModal';
import { 
  TriggerWrapper, TriggerButton, ReactionList, 
  ReactionCounter, TotalReactionsCount, ReactionTabs, 
  ReactedUsersList 
} from './styles';

const MAX_REACTIONS = 3;

export default function ReactionTrigger(props) {
  let { 
    reactions, 
    contentData = {}, 
    reactionsCount, 
    currentUserReaction = {},
    setReaction
  } = props;

  let [showList, toggleList] = useState(false);
  let [showModal, toggleModal] = useState(false);
  let [currentActiveTab, setActiveTab] = useState({});

  // We are passing nodeRef as null due to the issue with react-transition-group
  // with findDomNode function.
  const nodeRef = useRef(null)
  let triggerTimer = null;

  /**
   * Every time we hover over the button, after a slight delay we would show them the 
   * rest of the reactions, and if they move from the trigger button to the reaction list 
   * within the delay we would clear the timeout to prevent it from closing before 
   * choosing a reaction
   * 
   * @method triggerHoverIn
   * @param {Object} event
   */
  function triggerHoverIn(event) {
    if (event.target.id === 'trigger-button') {
      setTimeout(function() {
        toggleList(true);
      }, 300);
    } else {
      clearTimeout(triggerTimer);
    }
  }

  function triggerClose() {
    triggerTimer = setTimeout(function() {
      toggleList(false);
    }, 1000);
  }

  function showReactionModal(state) {
    toggleModal(true);
    setTabContent(state);
  }

  /**
  * The current active tab that is been clicked by user, we will return the choosen specific
  * set of reaction, if "all" we would combine all the reactions.
  * 
  * @method setTabContent
  * @param {String} state
  */
  function setTabContent(state) {
    let tabContent = [];
    if(state === 'all') {
      tabContent = Object.values(contentData).reduce((acc, curr) => {
        acc.push(...curr);
        return acc;
      }, [])
    } else {
      tabContent = contentData[state];
    }

    setActiveTab({
      tabId: state,
      content: tabContent
    });
  }

  return (
    <React.Fragment>
      <TriggerWrapper>
        <TriggerButton aria-label='reaction button' id='trigger-button' onClick={() => setReaction(currentUserReaction.id)}
          onMouseEnter={triggerHoverIn} onMouseLeave={triggerClose}>
          <span role='img' aria-label={currentUserReaction.name}>
            {currentUserReaction.emoji}
          </span> {currentUserReaction.name}
        </TriggerButton>

        <CSSTransition
          in={showList}
          timeout={300}
          nodeRef={nodeRef}
          classNames="reaction-drawer"
          unmountOnExit>
          <div className='list-wrapper'>
            <ReactionList ref={nodeRef} onMouseLeave={triggerClose} onMouseEnter={triggerHoverIn}>
              {Object.values(reactions).map((reaction, index) => {
                return  <button className='reaction-button' key={index} data-tooltip={reaction.name} 
                  onClick={() => setReaction(reaction.id)}>
                  <span role='img' aria-label={reaction.name} className='reaction-icon'>{reaction.emoji}</span>
                </button>
              })}
            </ReactionList>
          </div>
        </CSSTransition>
      </TriggerWrapper>

      {Object.entries(contentData).slice(0,MAX_REACTIONS).map((row, index) => {
        let [reactionId, users] = row;
        let currentReaction  = reactions[reactionId];

        let reactedUsers = users.map((user) => {
          return `${user.first_name} ${user.last_name}`
        }).join(', ');

        let toolTipString = `${reactedUsers} reacted with ${currentReaction.name}`

        return <ReactionCounter onClick={() => showReactionModal(currentReaction.id)} 
                key={index}
                data-tooltip={toolTipString}>
                 {currentReaction.emoji}
                </ReactionCounter>
      })}

      <TotalReactionsCount onClick={() => showReactionModal('all')}>
        {reactionsCount}
      </TotalReactionsCount>

      {/* Modal to show a detailed breakdown of the reactions */}
      {showModal && 
        <ReactionsModal onClose={() => toggleModal(false)}>
          <ReactionTabs>
            <span className={currentActiveTab.tabId === 'all' ? 'reaction-tab active' : 'reaction-tab'} 
              onClick={() => setTabContent('all')}>
              All
            </span>

            {Object.values(reactions).map((reaction, index) => {
              let isActive = reaction.id === currentActiveTab.tabId;
              let classNames = isActive ? 'reaction-tab active' : 'reaction-tab';

              return <span key={index} className={classNames} onClick={() => setTabContent(reaction.id)}>
                {reaction.name}
              </span>
            })}
          </ReactionTabs>
          <ReactedUsersList>
            {currentActiveTab.content.map((user, index) => (
              <li key={index} className='reacted-user'>
                <img src={user.avatar} className='user-avatar' alt='profile'/>
                <p className='user-name'>{user.first_name} {user.last_name}</p>
              </li>
            ))}
          </ReactedUsersList>
        </ReactionsModal>
      }
    </React.Fragment>
  );
}
