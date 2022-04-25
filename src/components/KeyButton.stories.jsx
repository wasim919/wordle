import React from 'react';
import KeyButton from './KeyButton';

export default {
    title: 'atoms/KeyButton',
    component: KeyButton,
    argTypes: {
        handleKeyboradEvent: {
            action: 'Clicked',
        },
        keyValue: {
            control: 'text',
        },
        keyIndex: {
            control: 'number',
        },
    },
};

const Template = (args) => <KeyButton {...args} />;

export const KeyButtonDefault = Template.bind({});
KeyButtonDefault.args = {
    keyValue: 'Q',
    keyIndex: 0,
};
