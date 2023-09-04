import Step from 'shepherd.js/src/types/step';

export const builtInButtons = {
  cancel: {
    classes: 'cancel-button',
    secondary: true,
    text: 'Exit',
    type: 'cancel'
  },
  next: {
    classes: 'next-button',
    text: 'Next',
    type: 'next'
  },
  back: {
    classes: 'back-button',
    secondary: true,
    text: 'Back',
    type: 'back'
  }
};

export const defaultStepOptions: Step.StepOptions = {
  classes: 'shepherd-theme-arrows custom-default-class',
  scrollTo: true,
  cancelIcon: {
    enabled: true
  }
};

export const steps: Step.StepOptions[] = [
  {
    attachTo: {
      element: '.first-element',
      on: 'left'
    },
    buttons: [
      builtInButtons.cancel,
      builtInButtons.next
    ],
    classes: 'custom-class-name-1 custom-class-name-2',
    id: 'intro',
    title: 'Welcome to the Math Quiz!',
    text: `
          <p>
            Welcome to the Math Quiz!
          </p>

         `
  },
  {
    attachTo: {
      element: '.second-element',
      on: 'left'
    },
    buttons: [
      builtInButtons.cancel,
      builtInButtons.back,
      builtInButtons.next
    ],
    classes: 'custom-class-name-1 custom-class-name-2',
    id: 'installation',
    title: 'Types of Questions',
    text: 'You will be presented with addition or subtraction problems.'
  },
  {
    attachTo: {
      element: '.third-element',
      on: 'bottom'
    },
    buttons: [
      builtInButtons.cancel,
      builtInButtons.back,
      builtInButtons.next
    ],
    classes: 'custom-class-name-1 custom-class-name-2',
    id: 'usage',
    title: 'What is your answer?',
    text: 'Type in your answer here!'
  },
  {
    attachTo: {
      element: '.fourth-element',
      on: 'top'
    },
    buttons: [
      builtInButtons.cancel,
      builtInButtons.back,
      builtInButtons.next
    ],
    classes: 'custom-class-name-1 custom-class-name-2',
    id: 'modal',
    title: 'Submitting answer',
    text: `
        <p>
          Remember to click submit to get the next question!
        </p>
`
  },
  {
    attachTo: {
      element: '.fifth-element',
      on: 'top'
    },
    buttons: [
      builtInButtons.cancel,
      builtInButtons.back,
      builtInButtons.next
    ],
    classes: 'custom-class-name-1 custom-class-name-2',
    id: 'buttons',
    title: 'Your Score',
    text: `Track your score here. You get 10 points for every correct answer!`
  },

  {
    buttons: [
      builtInButtons.cancel,
      builtInButtons.back
    ],
    id: 'noAttachTo',
    classes: 'custom-class-name-1 custom-class-name-2',
    text: `
      <p>Game ends after 10 rounds, try to get as many points as you can!</p>

      <strong>Have Fun!</strong>
    `
  }
];
