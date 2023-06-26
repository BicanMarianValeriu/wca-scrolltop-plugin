const {
    i18n: {
        __,
    },
    components: {
        Dashicon,
        Button,
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

/**
 * Custom Icons 
 */
const CustomIconsControl = ({ formData, setFormData, ...restProps }) => {
    const { baseControlProps, controlProps } = useBaseControlProps(restProps);
    const { disabled } = baseControlProps;

    const [viewBox, setViewBox] = useState(formData?.icon?.viewBox || '0 0 16 16');
    const items = formData?.icon.paths || ['M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z'];

    const addItem = () => {
        const updatedItems = [...items, ''];

        setFormData({
            ...formData, icon: {
                ...formData.icon,
                paths: updatedItems
            }
        });
    };

    const removeItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);

        setFormData({
            ...formData, icon: {
                ...formData.icon,
                paths: updatedItems
            }
        });
    };

    const updateItem = (index, value) => {
        const updatedItems = [...items];
        updatedItems[index] = value;

        setFormData({
            ...formData, icon: {
                ...formData.icon,
                paths: updatedItems
            }
        });
    };

    return (
        <BaseControl {...baseControlProps} >
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
                {items.map((item, index) => (
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