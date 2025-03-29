import { createRoute } from '../../create-route';

export default createRoute(async (c) => {
  return c.json({
    message: 'hi',
  });
});
