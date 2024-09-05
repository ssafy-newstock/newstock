import { Meta, StoryFn } from '@storybook/react';
import ThemedButton from './ThemedButton';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@styles/theme';

export default {
  title: 'Components/ThemedButton',
  component: ThemedButton,
} as Meta;

const Template: StoryFn = (args) => (
  <ThemeProvider theme={lightTheme}>
    <ThemedButton {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Click Me',
};
