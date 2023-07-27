const GRID_SIZE = 19;
const GRID_WIDTH = 35;
const GRID_HEIGHT = 35;
const AGENT = 0;
const SEARCH = 3;
const PATH = 4;
const BORDER = 2;
const FOOD = 6;
const SAND = 1;
const QUADMIRE = 5;
const WATER = 10;
const OBSTACLE = 1000;
const FRAME_RATE_SEARCH = 15;
const FRAME_RATE_MOVE = 5;
const COLORS = {
  [SAND]: '#F3E1BA',
  [QUADMIRE]: '#C5A088',
  [WATER]: '#16B8EB',
  [OBSTACLE]: '#FF0000',
  [AGENT]: '#ffcc00',
  [SEARCH]: '#F288F89E',
  [PATH]: '#FA009D60',
  [FOOD]: '#ffcc00',
  [BORDER]: '#AD52E9E0'
};