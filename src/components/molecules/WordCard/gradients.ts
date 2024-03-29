import {LinearGradientProps} from 'expo-linear-gradient';

type RequiredFields = 'start' | 'end' | 'colors' | 'locations';
const gradients: (Pick<LinearGradientProps, RequiredFields> &
  Partial<Exclude<LinearGradientProps, RequiredFields>> & {name: string})[] = [
  {
    name: 'Cool Blues',
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    colors: ['#2193b0', '#6dd5ed'],
    locations: [0, 1],
  },
  {
    name: 'Dark Ocean',
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    colors: ['#373B44', '#4286f4'],
    locations: [0, 1],
  },
  {
    name: 'Amin',
    start: {x: 0.5, y: 0},
    end: {x: 0.5, y: 1},
    colors: ['#8E2DE2', '#4A00E0'],
    locations: [0, 1],
  },
  {
    name: 'Harvey',
    start: {x: 0.5, y: 0},
    end: {x: 0.5, y: 1},
    colors: ['#99f2c8', '#1f4037'],
    locations: [0, 1],
  },
  {
    name: 'Ultra Voilet',
    start: {x: 0.5, y: 0},
    end: {x: 0.5, y: 1},
    colors: ['#eaafc8', '#654ea3'],
    locations: [0, 1],
  },
  {
    name: 'Orange Coral',
    start: {x: 0.5, y: 0},
    end: {x: 0.5, y: 1},
    colors: ['#ff5e62', '#ff9966'],
    locations: [0, 1],
  },
  {
    name: 'Venice',
    start: {x: 0.5, y: 0},
    end: {x: 0.5, y: 1},
    colors: ['#A7BFE8', '#6190E8'],
    locations: [0, 1],
  },
  {
    name: 'Roseanna',
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    colors: ['#FFAFBD', '#ffc3a0'],
    locations: [0, 1],
  },
  {
    name: 'Vice City',
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    colors: ['#3494E6', '#EC6EAD'],
    locations: [0, 1],
  },
  {
    name: "Ed's Sunset Gradient",
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    colors: ['#ff7e5f', '#feb47b'],
    locations: [0, 1],
  },
  {
    name: 'Nepal',
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    colors: ['#de6161', '#2657eb'],
    locations: [0, 1],
  },
  {
    name: 'Disco',
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    colors: ['#4ECDC4', '#556270'],
    locations: [0, 1],
  },
  {
    name: 'Lush',
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    colors: ['#56ab2f', '#a8e063'],
    locations: [0, 1],
  },
  {
    name: 'Dusk',
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    colors: ['#2C3E50', '#FD746C'],
    locations: [0, 1],
  },
  {
    name: 'Grapefruit Sunset',
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    colors: ['#e96443', '#904e95'],
    locations: [0, 1],
  },
  {
    name: 'Decent',
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    colors: ['#4CA1AF', '#C4E0E5'],
    locations: [0, 1],
  },
  {
    name: 'Purplin',
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    colors: ['#6a3093', '#a044ff'],
    locations: [0, 1],
  },
  {
    name: 'Clear Sky',
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    colors: ['#005C97', '#363795'],
    locations: [0, 1],
  },
  {
    name: 'Endless River',
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    colors: ['#43cea2', '#185a9d'],
    locations: [0, 1],
  },
];

export default gradients;
