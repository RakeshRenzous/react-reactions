import React, { useEffect, useState } from 'react';
import ReactionTrigger from '../../components/ReactionsTrigger';
import { ThemeProvider } from 'emotion-theming';
import Theme from '../../styles/theme';
import { AppContainer } from './styles';
import fetch from '../../services/fetch';
import { normalize, schema } from 'normalizr';

const CURRENT_USER = 5;
const CURRENT_CONTENT = 2;
const DEFAULT_REACTION = 1;

function App() {
  const [reactionsList, setReactions] = useState({});
  const [contentData, setContentData] = useState();
  const [reactionsCount, setReactionsCount] = useState();
  const [currentUserReaction, setCurrentUserData] = useState({ reaction_id: DEFAULT_REACTION });

  useEffect(() => {
    async function bootstrapApp() {

      let users = await fetch({endPoint: 'users'});
      let reactions = await fetch({endPoint: 'reactions'});
      let contents = await fetch({
        endPoint: 'contentReactions', 
        params: { content_id: CURRENT_CONTENT }
      });

      let userSchema = new schema.Entity('users');
      let reactionSchema = new schema.Entity('reactions');
    
      let normalizedUsers = normalize({users}, {users: [userSchema]});
      let normalizedReactions = normalize({reactions}, {reactions: [reactionSchema]});

      let { users: usersList } = normalizedUsers.entities;

      let contentMap = {};

      contents.forEach((content) => {
        let allReactedUsers = contentMap[content.reaction_id];
        let reactedUser = usersList[content.user_id];
        if(CURRENT_USER === content.user_id) {
          setCurrentUserData(content);
        }

        if (allReactedUsers === undefined) {
          contentMap[content.reaction_id] = [reactedUser];
        } else {
          allReactedUsers.push(reactedUser);
          contentMap[content.reaction_id] = allReactedUsers;
        }
      });

      setReactions(normalizedReactions.entities.reactions);
      setContentData(contentMap);
      setReactionsCount(contents.length);
    }

    bootstrapApp();
  }, []);

  async function setReaction(reaction) {
    await fetch({endPoint: 'contentReactions', 
    method: 'post',
    params: {
      user_id: CURRENT_USER,
      reaction_id: reaction,
      content_id: CURRENT_CONTENT
    }}).then(() => {
      setCurrentUserData({
        user_id: CURRENT_USER,
        reaction_id: reaction,
        content_id: CURRENT_CONTENT
      });
    });
  }

  return (
    <ThemeProvider theme={Theme}>
      <AppContainer>
        <ReactionTrigger
        reactions={reactionsList} 
        contentData={contentData}
        currentUserReaction={reactionsList[currentUserReaction.reaction_id]}
        setReaction={setReaction}
        reactionsCount={reactionsCount}/>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
