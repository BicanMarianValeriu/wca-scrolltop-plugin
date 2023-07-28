/**
 * @package: 	WeCodeArt CF7 Extension
 * @author: 	Bican Marian Valeriu
 * @license:	https://www.wecodeart.com/
 * @version:	1.0.0
 */

const {
    i18n: {
        __,
    },
    hooks: {
        addFilter
    },
    components: {
        Placeholder,
        Card,
        CardHeader,
        CardBody,
        Spinner,
        Button,
        TextControl,
        BaseControl,
        ColorPicker,
        RangeControl,
        DropdownMenu,
        SelectControl,
        // ToggleControl,
        ColorIndicator,
        __experimentalHStack: HStack,
        __experimentalNumberControl: NumberControl,
        __experimentalBorderBoxControl: BorderBoxControl,
    },
    element: {
        useState,
    },
    blockEditor: {
        useSetting
    },
} = wp;

import { CustomIconsControl, PreviewButton } from './admin/Components';

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

    const apiOptions = (({ scrolltop }) => (scrolltop))(settings);
    const [loading, setLoading] = useState(null);
    const [formData, setFormData] = useState(apiOptions);

    const setStyle = (extra = {}) => {
        const newStyle = { ...formData?.style, ...extra };

        setFormData({ ...formData, style: newStyle });
    };

    const handleNotice = () => {
        setLoading(false);

        return createNotice('success', __('Settings saved.', 'wca-scrolltop'));
    };

    const colors = useSetting('color.palette');

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
                                <CustomIconsControl
                                    {...{ formData, setFormData }}
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
                                    colors={colors}
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
                                    step={10}
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
            <PreviewButton {...{ formData }} />
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