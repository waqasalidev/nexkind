const SESSION_KEY = 'nexkind_chat_session';

export const getChatSessionId = () => {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
};

export const getChatHeaders = () => ({
  'x-session-id': getChatSessionId(),
});
