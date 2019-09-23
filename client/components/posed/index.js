import posed from 'react-pose'

export const ParentContainer = posed.div({
  enter: {opacity: 1, staggerChildren: 25},
  exit: {opacity: 0}
})

export const ContainerHorizontal = posed.div({
  enter: {x: 0, opacity: 1},
  exit: {x: 50, opacity: 0}
})

export const ContainerVertical = posed.div({
  enter: {y: 0, opacity: 1},
  exit: {y: 50, opacity: 0}
})
