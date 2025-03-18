import { ChatWrapper } from '../islands/chat';
import { createRoute } from '../createRoute';

export default createRoute(async (c) => {
  return c.render(<ChatWrapper />);
});
