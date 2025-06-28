const appReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE": {
      return {
        ...state,
        language: action.payload,
      };
    }
    case "CHANGE_THEME": {
      return {
        ...state,
        theme: action.payload,
      };
    }
    case "CHANGE_USER": {
      const { status, information } = action.payload;
      return {
        ...state,
        user: {
          status,
          information,
        },
      };
    }
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "NOTIFICATION_LIST":
      return {
        ...state,
        notifications: action.payload,
      };
    case "NOTIFICATION_CHANGE_STATUS":
      return {
        ...state,
        messageId: action.payload,
      };

    case "SHOWLOADING": {
      return {
        ...state,
        hasShowBackDrop: action.payload,
      };
    }
  }
};

export default appReducer;
