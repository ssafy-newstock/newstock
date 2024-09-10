import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { lightTheme, darkTheme } from '@styles/theme';

export default {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => (
  <ThemeProvider theme={args.theme}>
    <Navbar {...args} />
  </ThemeProvider>
);

export const LightMode = Template.bind({});
LightMode.args = {
  theme: lightTheme,
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  theme: darkTheme,
};