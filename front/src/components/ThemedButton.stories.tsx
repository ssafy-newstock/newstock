import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import ThemedButton from './ThemedButton';
import { lightTheme, darkTheme } from '@styles/theme';

export default {
  title: 'Components/ThemedButton',
  component: ThemedButton,
  tags: ['autodocs']
} as Meta;

const Template: StoryFn = (args) => (
  <ThemeProvider theme={args.theme}>
    <ThemedButton {...args} />
  </ThemeProvider>
);

export const LightMode = Template.bind({});
LightMode.args = {
  children: 'Light Mode Button',
  theme: lightTheme,
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  children: 'Dark Mode Button',
  theme: darkTheme,
};
