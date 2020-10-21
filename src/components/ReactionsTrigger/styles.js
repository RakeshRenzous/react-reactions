import styled from '@emotion/styled';

export const TriggerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .list-wrapper {
    position: absolute;
    left: 50%;
    transform: translateX(-50%); 
    bottom: 32px;
  }
`;

export const TriggerButton = styled.button`
  background-color: ${props => props.theme.components.trigger.background};
  padding: 4px 12px;
  font-size: ${props => props.theme.fontSizes.medium};
  border-radius: ${props => props.theme.radii.small};
  box-shadow: ${props => props.theme.boxShadow.primary};

  &:hover {
    background-color: ${props => props.theme.components.trigger.hover}; 
  }
`;

export const ReactionList = styled.div`
  background-color: ${props => props.theme.components.trigger.background};
  border-radius: ${props => props.theme.radii.large};
  display: flex;
  bottom: 36px;
  box-shadow: ${props => props.theme.boxShadow.secondary};
  padding: 4px 8px;

  .reaction-button {
    background-color: transparent;
    border: none;
    font-size: ${props => props.theme.fontSizes.large};
    border-radius: 50%;
    margin-right: 8px;
    position: relative;

    &:last-of-type {
      margin-right: 0;
    }

    &::before {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 42px;
      font-size: ${props => props.theme.fontSizes.default};
      background-color: ${props => props.theme.components.tooltip.background};
      opacity: 0;
      transition: linear 0.3s;
      color: ${props => props.theme.fontColors.light};
      padding: 4px 8px;
      border-radius: ${props => props.theme.radii.small};
      left: 50%;
      transform: translateX(-50%);
    }

    &:hover {
      &::before {
        opacity: 1;
      }
    }

    .reaction-icon {
      display: inline-block;

      &:hover {
        transform: scale(1.35);
        transition: linear 0.2s;
        cursor: pointer;
      }
    }

  }

  &.reaction-drawer {
    &-enter{
      opacity: 0;
    }

    &-enter-active {
      opacity: 1;
      transform: translate(0, -18px);
      transition: opacity 300ms, transform 300ms;
    }

    &-enter-done {
      transform: translate(0, -18px);
    }

    &-exit {
      opacity: 1;
      transform: translateY(-18px);
    }
  
    &-exit-active {
      opacity: 0;
      transform: translateY(0);
      transition: opacity 300ms, transform 300ms;
    }
  }
`;

export const ReactionCounter = styled.span`
  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: ${props => props.theme.PALLETE.lightBg};
  justify-content: center;
  border-radius: 50%;
  line-height: 1;
  box-shadow: ${props => props.theme.boxShadow.secondary};
  font-size: ${props => props.theme.fontSizes.default};
  position: relative;
  margin-left: 8px;

  &::before {
    content: attr(data-tooltip);
    position: absolute;
    top: 36px;
    font-size: ${props => props.theme.fontSizes.small};
    background-color: ${props => props.theme.components.tooltip.background};
    opacity: 0;
    visibility: hidden;
    transition: linear 0.3s;
    color: ${props => props.theme.fontColors.light};
    padding: 4px 8px;
    border-radius: ${props => props.theme.radii.small};
    left: 50%;
    transform: translateX(-50%);
    width: 128px;
    text-align: center;
  }

  &:hover {
    cursor: pointer;

    &::before {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const TotalReactionsCount = styled.span`
  color: ${props => props.theme.PALLETE.blueHue};
  display: inline-block;
  margin-left: 8px;
  font-weight: ${props => props.theme.fontWeight.semiBold};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ReactionTabs = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  margin-bottom: 12px;
  border-bottom: 1px solid ${props => props.theme.border.primary};
  position: sticky;
  top: 0;
  background-color: ${props => props.theme.PALLETE.lightBg};

  .reaction-tab {
    padding-bottom: 12px;
    border-bottom: 2px solid transparent;

    &.active {
      border-bottom: 2px solid ${props => props.theme.PALLETE.blueHue};
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

export const ReactedUsersList = styled.ul`
  list-style-type: none;
  padding: 0 16px;

  .reacted-user {
    display: flex;
    align-items: center;
  }

  .user-avatar {
    border-radius: 50%;
    height: 32px;
    width: 32px;
  }

  .user-name {
    margin-left: 16px;
  }
`;

