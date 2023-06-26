/**
 * @package: 	WeCodeArt CF7 Extension
 * @author: 	Bican Marian Valeriu
 * @license:	https://www.wecodeart.com/
 * @version:	1.0.0
 */

const {
    i18n: {
        __,
        sprintf
    },
    hooks: {
        addFilter
    },
    components: {
        Placeholder,
        ToggleControl,
        Card,
        CardHeader,
        CardBody,
        Spinner,
        Icon,
        Dashicon,
        Button,
        Tooltip,
        Popover,
        TextControl,
        BaseControl,
        ColorPicker,
        RangeControl,
        DropdownMenu,
        SelectControl,
        ColorIndicator,
        FormFileUpload,
        useBaseControlProps,
        __experimentalHStack: HStack,
        __experimentalNumberControl: NumberControl,
        __experimentalBorderBoxControl: BorderBoxControl,
    },
    blockEditor: {
        MediaUpload,
        MediaUploadCheck,
    },
    element: {
        useState,
        useEffect,
        useRef
    }
} = wp;

addFilter('wecodeart.admin.tabs.plugins', 'wecodeart/scrolltop/admin/panel', optionsPanel);
function optionsPanel(panels) {
    return [...panels, {
        name: 'wca-scrolltop',
        title: __('Scroll Top', 'wca-scrolltop'),
        render: (props) => <Options {...props} />
    }];
}

const Options = (props) => {
    const { settings, saveSettings, isRequesting, createNotice } = props;

    if (isRequesting || !settings) {
        return <Placeholder {...{
            icon: <Spinner />,
            label: __('Loading', 'wca-scrolltop'),
            instructions: __('Please wait, loading settings...', 'wca-scrolltop')
        }} />;
    }

    const [loading, setLoading] = useState(null);
    const apiOptions = (({ scrolltop }) => (scrolltop))(settings);
    const [formData, setFormData] = useState(apiOptions);
    const [disabledButton, setDisabledButton] = useState(true);

    const setStyle = (extra = {}) => {
        const newStyle = { ...formData?.style, ...extra };

        setFormData({ ...formData, style: newStyle });
    };

    const handleNotice = () => {
        setLoading(false);

        return createNotice('success', __('Settings saved.', 'wca-scrolltop'));
    };

    const capitalizeFirstLetter = word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

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
                borderStyles = { ...borderStyles, [`border${capitalizeFirstLetter(dir)}`]: Object.values(dirStyles).join(' ') }
            }
        } else {
            borderStyles = { border: Object.values(border).join(' ') };
        }

        style = { ...style, ...borderStyles };

        return style;
    };

    const IconPathsControl = (props) => {
        const { baseControlProps, controlProps } = useBaseControlProps(props);
        const { disabled } = baseControlProps;

        const items = formData?.icon.paths || ['M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z'];

        const addItem = () => {
            const updatedItems = [...items, ''];
            setFormData({
                ...formData, icon: {
                    ...formData?.icon,
                    paths: updatedItems
                }
            });
        };

        const removeItem = (index) => {
            const updatedItems = [...items];
            updatedItems.splice(index, 1);
            setFormData({
                ...formData, icon: {
                    ...formData?.icon,
                    paths: updatedItems
                }
            });
        };

        const updateItem = (index, value) => {
            const updatedItems = [...items];
            updatedItems[index] = value;
            setFormData({
                ...formData, icon: {
                    ...formData?.icon,
                    paths: updatedItems.filter()
                }
            });
        };

        const [viewBox, setViewBox] = useState(formData?.icon?.viewBox);

        return (
            <BaseControl {...baseControlProps} >
                <p>
                    <HStack style={{ alignItems: 'stretch' }}>
                        <TextControl {...controlProps} disabled={disabled} className="flex-grow-1" placeholder={__('ViewBox', 'wca-scrolltop')} value={viewBox} onChange={setViewBox} />
                        <Button disabled={disabled} style={{ height: 'initial' }} isSecondary isSmall onClick={() => {
                            setFormData({
                                ...formData, icon: {
                                    ...formData?.icon,
                                    viewBox
                                }
                            });
                        }} showTooltip>
                            {__('Update SVG viewBox', 'wca-scrolltop')}
                        </Button>
                    </HStack>
                </p>
                <p>
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

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            setDisabledButton(currentPosition < formData?.scroll?.offset);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [formData?.scroll?.offset]);

    return (
        <>
            <div className="grid" style={{ '--wca--columns': 2 }}>
                <div className="g-col-1">
                    <Card className="border shadow-none">
                        <CardHeader>
                            <h5 className="text-uppercase fw-medium m-0">{__('Design', 'wca-scrolltop')}</h5>
                        </CardHeader>
                        <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                            <p>
                                <IconPathsControl
                                    label={__('Icon', 'wca-scrolltop')}
                                    help={__('Use simple icons like FontAwesome or Bootstrap. Each icon can have 1 or more path elements.', 'wca-scrolltop')}
                                />
                            </p>
                            <p>
                                <SelectControl
                                    label={__('Position', 'wca-scrolltop')}
                                    value={formData?.position}
                                    options={[
                                        { label: __('Left', 'wca-scrolltop'), value: 'left' },
                                        { label: __('Right', 'wca-scrolltop'), value: 'right' },
                                    ]}
                                    onChange={position => setFormData({ ...formData, position })}
                                    __nextHasNoMarginBottom
                                />
                            </p>
                            <p>
                                <HStack>
                                    <NumberControl
                                        isShiftStepEnabled={true}
                                        spinControls="custom"
                                        label={__('Horizontal Margin', 'wca-scrolltop')}
                                        help={__('Number of pixels for horizontal window distance.', 'wca-scrolltop')}
                                        min={0}
                                        value={formData?.style?.[formData?.position]}
                                        onChange={value => setStyle({ [formData?.position]: parseInt(value) })}
                                    />
                                    <NumberControl
                                        isShiftStepEnabled={true}
                                        spinControls="custom"
                                        label={__('Vertical Margin', 'wca-scrolltop')}
                                        help={__('Number of pixels for vertical window distance.', 'wca-scrolltop')}
                                        min={0}
                                        value={formData?.style?.bottom}
                                        onChange={bottom => setStyle({ bottom: parseInt(bottom) })}
                                    />
                                </HStack>
                            </p>
                            <p>
                                <NumberControl
                                    isShiftStepEnabled={true}
                                    spinControls="custom"
                                    label={__('Size', 'wca-scrolltop')}
                                    min={20}
                                    value={formData?.style?.width}
                                    onChange={size => setStyle({ width: parseInt(size), height: parseInt(size) })}
                                    help={__('In pixels.', 'wca-scrolltop')}
                                />
                            </p>
                            <p>
                                <NumberControl
                                    isShiftStepEnabled={true}
                                    spinControls="custom"
                                    label={__('Padding', 'wca-scrolltop')}
                                    min={0}
                                    value={formData?.style?.padding}
                                    onChange={padding => setStyle({ padding: parseInt(padding) })}
                                    help={__('In pixels.', 'wca-scrolltop')}
                                />
                            </p>
                            <p>
                                <RangeControl
                                    label={__('Opacity', 'wca-scrolltop')}
                                    value={formData?.style?.opacity}
                                    onChange={opacity => setStyle({ opacity: parseInt(opacity) })}
                                    min={0}
                                    step={5}
                                    max={100}
                                />
                            </p>
                            <p>
                                <BaseControl label={__('Colors', 'wca-scrolltop')}>
                                    <HStack style={{ justifyContent: 'flex-start' }}>
                                        <DropdownMenu
                                            label={__('Background Color', 'wca-scrolltop')}
                                            icon={<ColorIndicator colorValue={formData?.style?.backgroundColor} />}
                                            toggleProps={{
                                                style: {
                                                    height: 'initial',
                                                    minWidth: 'initial',
                                                    padding: 0
                                                }
                                            }}
                                            popoverProps={{
                                                focusOnMount: 'container',
                                                position: 'bottom',
                                                noArrow: false,
                                            }}
                                        >
                                            {() => (
                                                <ColorPicker
                                                    color={formData?.style?.backgroundColor}
                                                    onChange={backgroundColor => setStyle({ backgroundColor })}
                                                    enableAlpha
                                                    defaultValue="#000"
                                                />
                                            )}
                                        </DropdownMenu>
                                        <DropdownMenu
                                            label={__('Icon Color', 'wca-scrolltop')}
                                            icon={<ColorIndicator colorValue={formData?.style?.color} />}
                                            toggleProps={{
                                                style: {
                                                    height: 'initial',
                                                    minWidth: 'initial',
                                                    padding: 0
                                                }
                                            }}
                                            popoverProps={{
                                                focusOnMount: 'container',
                                                position: 'bottom',
                                                noArrow: false,
                                            }}
                                        >
                                            {() => (
                                                <ColorPicker
                                                    color={formData?.style?.color}
                                                    onChange={color => setStyle({ color })}
                                                    enableAlpha
                                                    defaultValue="#000"
                                                />
                                            )}
                                        </DropdownMenu>
                                    </HStack>
                                </BaseControl>
                            </p>
                            <p>
                                <BorderBoxControl
                                    label={__('Border', 'wca-scrolltop')}
                                    value={formData?.style?.border}
                                    onChange={border => setStyle({ border })}
                                />
                            </p>
                            <p>
                                <RangeControl
                                    label={__('Radius', 'wca-scrolltop')}
                                    allowReset={true}
                                    value={formData?.style?.borderRadius}
                                    onChange={borderRadius => setStyle({ borderRadius })}
                                    min={0}
                                />
                            </p>
                        </CardBody>
                    </Card>
                </div>
                <div className="g-col-1">
                    <Card className="border shadow-none position-sticky sticky-top h-100">
                        <CardHeader>
                            <h5 className="text-uppercase fw-medium m-0">{__('Functionality', 'wca-scrolltop')}</h5>
                        </CardHeader>
                        <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                            <p>
                                <SelectControl
                                    label={__('Action', 'wca-scrolltop')}
                                    value={formData?.action}
                                    options={[
                                        { label: 'Scroll to Top', value: 'top' },
                                        { label: 'Scroll to Element', value: 'element' },
                                    ]}
                                    onChange={action => {
                                        if (action === 'top') {
                                            delete formData.element;
                                        }
                                        setFormData({ ...formData, action });
                                    }}
                                />
                            </p>
                            {formData?.action === 'element' && <>
                                <p>
                                    <TextControl
                                        label={__('Element selector', 'wca-scrolltop')}
                                        value={formData?.element?.selector}
                                        onChange={selector => setFormData({
                                            ...formData, element: {
                                                ...formData.element,
                                                selector
                                            }
                                        })}
                                        help={__('CSS selector of the element, you are trying to scroll to. Eg: #myDivID, .myDivClass', 'wca-scrolltop')}
                                    />
                                </p>
                                <p>
                                    <NumberControl
                                        isShiftStepEnabled={true}
                                        spinControls="custom"
                                        label={__('Element offset', 'wca-scrolltop')}
                                        value={formData?.element?.offset}
                                        onChange={offset => setFormData({
                                            ...formData, element: {
                                                ...formData.element,
                                                offset: parseInt(offset)
                                            }
                                        })}
                                        help={__('Negative value allowed. Use this to precisely set scroll position when you have overlapping elements.', 'wca-scrolltop')}
                                    />
                                </p>
                            </>}
                            <p>
                                <NumberControl
                                    isShiftStepEnabled={true}
                                    spinControls="custom"
                                    label={__('Scroll offset', 'wca-scrolltop')}
                                    help={__('Number of pixels to be scrolled before the button appears.', 'wca-scrolltop')}
                                    min={0}
                                    value={formData?.scroll?.offset}
                                    onChange={offset => setFormData({
                                        ...formData, scroll: {
                                            ...formData?.scroll,
                                            offset: parseInt(offset)
                                        }
                                    })}
                                />
                            </p>
                            <p>
                                <NumberControl
                                    isShiftStepEnabled={true}
                                    spinControls="custom"
                                    label={__('Scroll duration', 'wca-scrolltop')}
                                    help={__('Window scroll duration in milliseconds when the button is pressed.', 'wca-scrolltop')}
                                    min={100}
                                    disabled="disabled"
                                    value={formData?.scroll?.duration}
                                    onChange={duration => setFormData({
                                        ...formData, scroll: {
                                            ...formData?.scroll,
                                            duration: parseInt(duration)
                                        }
                                    })}
                                />
                            </p>
                            <p>
                                <TextControl
                                    label={__('Class(es)', 'wca-scrolltop')}
                                    value={formData?.classes}
                                    onChange={classes => setFormData({ ...formData, classes })}
                                    help={__('You can use utilities like: d-none, d-md-block; and so on.', 'wca-scrolltop')}
                                />
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <Tooltip text={__('Preview', 'wca-scrolltop')}>
                <Button className={`position-fixed${formData?.classes ? ' ' + formData.classes : ''}`} style={generateStyles(formData)}>
                    <Icon icon={() => {
                        return (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox={formData?.icon?.viewBox || '0 0 16 16'}>
                                {formData?.icon?.paths.map(el => {
                                    return (
                                        <path fill="currentColor" d={el} />
                                    );
                                })}
                            </svg>
                        )
                    }} />
                </Button>
            </Tooltip>
            <hr style={{ margin: '20px 0' }} />
            <Button
                className="button"
                isPrimary
                isLarge
                icon={loading && <Spinner />}
                onClick={() => {
                    setLoading(true);
                    saveSettings({ scrolltop: formData }, handleNotice);
                }}
                {...{ disabled: loading }}
            >
                {loading ? '' : __('Save', 'wecodeart')}
            </Button>
        </>
    );
};