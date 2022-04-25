import React from 'react';
import Tiles from './Tiles';

export default {
    title: 'molecules/Tiles',
    component: Tiles,
    argTypes: {
        tiles: {
            control: 'object',
        },
    },
};

const Template = (args) => <Tiles {...args} />;

export const TilesDefault = Template.bind({});
TilesDefault.args = {
    tiles: [
        ['Q', 'U', 'I', 'C', 'K'],
        ['R', 'O', 'Y', 'A', 'L'],
    ],
};
