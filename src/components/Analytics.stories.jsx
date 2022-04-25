import React from 'react';
import Analytics from './Analytics';

export default {
    title: 'molecules/Analytics',
    component: Analytics,
    argTypes: {
        score: {
            control: 'number',
        },
        tries: {
            control: 'number',
        },
    },
};

const Template = (args) => <Analytics {...args} />;

export const AnalyticsDefault = Template.bind({});
AnalyticsDefault.args = {
    score: 23,
    tries: 26,
};
