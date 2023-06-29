const {
    i18n: {
        __,
    },
    components: {
        Dashicon,
        Button,
        ButtonGroup,
        Tooltip,
        Icon,
        TextControl,
        BaseControl,
        useBaseControlProps,
        __experimentalHStack: HStack,
    },
    element: {
        useState,
        useEffect
    }
} = wp;

import { capitalizeWord } from './functions';

const DEFAULT_ICONS = [
    {
        viewBox: '0 0 16 16',
        paths: [
            'M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z'
        ]
    },
    {
        viewBox: '0 0 16 16',
        paths: [
            'M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z'
        ]
    },
    {
        viewBox: '0 0 16 16',
        paths: [
            'M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z',
            'M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z'
        ]
    },
    {
        viewBox: '0 0 16 16',
        paths: [
            'M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z'
        ]
    },
    {
        viewBox: '0 0 16 16',
        paths: [
            'M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z'
        ]
    }
];

/**
 * Custom Icons 
 */
const CustomIconsControl = ({ formData, setFormData, ...restProps }) => {
    const { baseControlProps, controlProps } = useBaseControlProps(restProps);
    const { disabled } = baseControlProps;
    const { icon = {} } = formData || {};

    const [viewBox, setViewBox] = useState(icon?.viewBox);
    const [paths, setPaths] = useState(icon?.paths);

    const handleSelect = (icon) => {
        setPaths(icon.paths);
        setViewBox(icon.viewBox);
        setFormData({ ...formData, icon });
    };

    const addItem = () => {
        const updatedItems = [...paths, ''];

        setPaths(updatedItems);
        setFormData({
            ...formData, icon: {
                viewBox,
                paths: updatedItems
            }
        });
    };

    const removeItem = (index) => {
        const updatedItems = [...paths];
        updatedItems.splice(index, 1);

        setPaths(updatedItems);
        setFormData({
            ...formData, icon: {
                viewBox,
                paths: updatedItems
            }
        });
    };

    const updateItem = (index, value) => {
        const updatedItems = [...paths];
        updatedItems[index] = value;

        setPaths(updatedItems);
        setFormData({
            ...formData, icon: {
                viewBox,
                paths: updatedItems
            }
        });
    };

    return (
        <BaseControl {...baseControlProps} >
            <p style={{ marginTop: 0 }}>
                <ButtonGroup>
                    {DEFAULT_ICONS.map((item) => (
                        <Button isPrimary={JSON.stringify(item) === JSON.stringify(icon)} onClick={() => handleSelect(item)}>
                            <Icon icon={() => {
                                return (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox={item?.viewBox} height={16}>
                                        {item?.paths.map(el => <path fill="currentColor" d={el} />)}
                                    </svg>
                                )
                            }} />
                        </Button>
                    ))}
                </ButtonGroup>
            </p>
            <p style={{ marginTop: 0 }}>
                <HStack style={{ alignItems: 'stretch' }}>
                    <TextControl {...controlProps} disabled={disabled} className="flex-grow-1" placeholder={__('ViewBox', 'wca-scrolltop')} value={viewBox} onChange={setViewBox} />
                    <Button disabled={disabled} style={{ height: 'initial' }} isSecondary isSmall onClick={() => {
                        setFormData({
                            ...formData, icon: {
                                ...formData.icon,
                                viewBox
                            }
                        });
                    }} showTooltip>
                        {__('Update SVG viewBox', 'wca-scrolltop')}
                    </Button>
                </HStack>
            </p>
            <p style={{ marginTop: 0 }}>
                {paths.map((item, index) => (
                    <p style={{ marginTop: 0 }}>
                        <HStack key={index} style={{ alignItems: 'stretch' }}>
                            <TextControl {...controlProps} disabled={disabled} className="flex-grow-1" placeholder={__('Path', 'wca-scrolltop')} value={item} onChange={(value) => updateItem(index, value)} />
                            {index !== 0 &&
                                <Button disabled={disabled} style={{ height: 'initial' }} isDestructive isSmall onClick={() => removeItem(index)}>
                                    <Dashicon icon="no" />
                                </Button>
                            }
                        </HStack>
                    </p>
                ))}
            </p>
            <Button disabled={disabled} isPrimary onClick={addItem}>{__('Add Path', 'wca-scrolltop')}</Button>
        </BaseControl>
    );
};

/**
 * Custom Icons 
 */
const PreviewButton = ({ formData }) => {
    const {
        icon: {
            viewBox = '0 0 16 16',
            paths = ['M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z'],
        } = {},
        scroll: {
            offset = 0
        } = {},
        classes = '',
    } = formData;

    const [disabledButton, setDisabledButton] = useState(window.scrollY < offset);

    const generateStyles = ({
        position,
        style: {
            padding,
            border = {},
            borderRadius,
            opacity,
            width,
            height,
            left = 'initial',
            right = 'initial',
            bottom = 0,
            backgroundColor = 'transparent',
            color = 'inherit',
        } = {}
    } = {}) => {
        let style = {
            position: 'fixed',
            zIndex: disabledButton ? -1 : 5,
            bottom,
            width,
            height,
            padding,
            color,
            borderRadius,
            backgroundColor,
            opacity: disabledButton ? 0 : `${opacity}%`,
            left: position === 'left' ? left : 'initial',
            right: position === 'right' ? right : 'initial',
            transition: 'all .3s ease-in-out'
        }

        let borderStyles = {};
        const borderKeys = Object.keys(border);
        const sides = ['top', 'left', 'right', 'bottom'];
        const hasBorderMultiple = sides.some(side => borderKeys.includes(side));

        if (hasBorderMultiple) {
            for (const dir in border) {
                const dirStyles = border[dir];
                borderStyles = { ...borderStyles, [`border${capitalizeWord(dir)}`]: Object.values(dirStyles).join(' ') }
            }
        } else {
            borderStyles = { border: Object.values(border).join(' ') };
        }

        style = { ...style, ...borderStyles };

        return style;
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            setDisabledButton(currentPosition < offset);
        };

        // To disable button on offset change.
        handleScroll();

        // To disable button on scroll.
        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => window.removeEventListener('scroll', handleScroll);
    }, [offset]);

    return (
        <Tooltip text={__('Preview', 'wca-scrolltop')}>
            <Button className={classes} style={generateStyles(formData)}>
                <Icon icon={() => {
                    return (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
                            {paths.map(el => {
                                return (
                                    <path fill="currentColor" d={el} />
                                );
                            })}
                        </svg>
                    )
                }} />
            </Button>
        </Tooltip>
    );
}

export { CustomIconsControl, PreviewButton };