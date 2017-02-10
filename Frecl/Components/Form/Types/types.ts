import {ShallowCompare, DateRangeMoment, DateRangeMap, BaseReactProps} from "../../../types";
import {Map, List} from "immutable";
import moment from "moment";


export type eventHandler = (any) => boolean

export interface ValidationProps{
	required?: boolean,
	customValidation?: (any) => boolean	
}

export interface InputValidationProps extends ValidationProps{
	min?: string | number,
	max?: string | number,
	minLength?: string | number,
	maxLength?: string | number,
	pattern?: string,
}

export interface BaseEventProps {
	onBlur?: eventHandler
}

export interface InputEventProps extends BaseEventProps {
	onChange?: eventHandler	
}

export interface FieldSetProps extends BaseReactProps, BaseEventProps {
	id: string,
	name: string
}

export interface InputGroupProps extends BaseReactProps {
	prepend?: React.ReactNode,
	append?: React.ReactNode
}

export interface LabelProp {
	/** Add a label to the input*/			
	label?: string
}

export interface TypeProp {
	/** What type of input is it [hidden|text|ect] */
  type?: string
}

export interface BaseFormProps {
	/** Name of the input in state; You can append [] to signify a group of inputs*/
	name: string
}

export interface InputWrapperProps extends BaseReactProps, LabelProp, BaseFormProps, TypeProp {
	/** Pass in something to be appened to the end of a label */ 	
	labelPostfix?: any,

}


interface BaseInputProps extends BaseReactProps, InputEventProps, ValidationProps, BaseFormProps, TypeProp{
	id?: string,
	/** Default value for the input to display */	
	defaultValue?: ShallowCompare,
	/** Automatically select this field on navigation*/			
	autoFocus?: boolean,
}

export interface OptionalValidationProps{
	/** Disable the input*/	
	disabled?: any,
	/** Don't validate the input*/			
	noValidate? :any,
}



export interface InputProps extends BaseInputProps{}
export interface TextAreaProps extends InputProps, InputValidationProps, InputWrapperProps {}
export interface TextInputProps extends TextAreaProps, InputGroupProps, InputWrapperProps {} 


interface BaseSwitchProps {
	defaultChecked?: boolean | string | number,
	defaultSelected?: boolean | string | number
}

export interface SelectInputProps extends TextInputProps, BaseSwitchProps {
	/** Pass in an arrow to display at the edge of the select box */ 
	arrow?: React.ReactNode
}

export interface SwitchProps extends InputProps, BaseSwitchProps, LabelProp{
	/** Put into state as the value of the selected switch */
	id: string
}

export interface RadioTabsProps extends BaseReactProps, BaseFormProps{
	radioClasses?: string,
	label?: string
}


export interface ValidationElementProps extends BaseReactProps, BaseFormProps{
	/** What validation attribute is the message for */
	isFor: string,
}

export interface DropZoneProps extends BaseReactProps, BaseFormProps{
	/** Can you upload multiple files*/	
	multiple?: boolean,
	/** Display a list of uploaded files*/		
	showList?: boolean
}

export interface DateWrapperProps extends InputWrapperProps, InputGroupProps, BaseReactProps{
	placeholder?: string
}

export interface InternalDateWrapperProps extends DateWrapperProps{
	valueString: string,
	children: React.ReactElement<any>
}

export interface DatePickerProps extends BaseReactProps, BaseFormProps, DateWrapperProps{
	date?: moment.Moment,
	format?: string,
	firstDayOfTheWeek?: number,
	theme?: Object,
	onChange?: eventHandler,
	onInit?: eventHandler,
	minDate?: string | moment.Moment | Function,
	maxDate?: string | moment.Moment | Function
}

export interface DateRangeProps extends DatePickerProps {
	startDate?: string | moment.Moment | Function,
	endDate?: string | moment.Moment | Function
}


export interface ValidationCloneElementProps extends InputInfoProps {
  typeOfValidation: string,
  test: boolean | string | Function,
  type?: string,
  name: string
}

export interface ValidationAdditionProps extends ValidationElementProps, ValidationCloneElementProps{
}


/*Performance Wrapper HOCS*/
interface InputInfo extends Map<string, any>{
	changed: boolean,
	blurred?: boolean
	value: ShallowCompare,
}

export interface InputInfoProps {
	inputInfo: InputInfo,
	inputGroupInfo: List<InputInfo>
}

export interface PerformanceWrapperContext extends BaseInputProps {
  FormState: Map<string, any>,
  nameSpace: string,
  fieldSetNameSpace: string
}
export interface PerformanceWrapperWithHandlers extends PerformanceWrapperContext {
	getInputPath: () => Array<string>,
}
export interface PerformanceWrapperProps extends PerformanceWrapperWithHandlers, InputInfoProps {}

/*Performance Wrapper Input Varients */
export interface TextInputPerformanceWrapperProps extends PerformanceWrapperProps, TextInputProps {}

export interface SwitchInputPerformanceWrapperProps extends PerformanceWrapperProps, SwitchProps{
	id: string,
	type: string
}
export interface DisplayValidationPerformanceWrapperProps extends PerformanceWrapperProps, OptionalValidationProps{}
export interface SelectPerformanceWrapperProps extends PerformanceWrapperProps, SelectInputProps{}
export interface TextAreaPerformanceWrapperProps extends PerformanceWrapperProps, TextAreaProps{}
export interface DropZonePerformanceWrapperProps extends PerformanceWrapperProps, DropZoneProps{}
export interface DateRangePerformanceWrapperProps extends PerformanceWrapperProps, DateRangeProps{}


export interface InputHOCInitialProps extends PerformanceWrapperProps, BaseSwitchProps, InputProps, InputInfoProps {}

export type DropZoneFile = List<Map<string, any>>

export interface InputHOCContextProps extends InputHOCInitialProps {
  dispatch: Function,
	value?: string | number | boolean | DropZoneFile | DateRangeMap
} 
export interface InputHOCMapProps extends InputHOCContextProps {
  inputPath: string[]
} 
export interface InputHOCWithHandlersProps extends InputHOCMapProps {
	/** Update state with a new value for this input */ 
  inputChanged: (value: ShallowCompare, changed?:boolean) => undefined,
	/** Set the inputs state */ 
  setInputBlurred: () => undefined,
  getAttributes: () => any
} 


export interface TextInputHOCWithHandlersProps extends InputHOCWithHandlersProps, TextInputProps {
	value: string | number
}
export interface TextAreaInputHOCWithHandlersProps extends InputHOCWithHandlersProps, TextAreaProps {
	value: string | number	
}
export interface SelectInputHOCWithHandlersProps extends InputHOCWithHandlersProps, SelectInputProps {
	value: string | number | boolean
}
export interface SwitchInputHOCWithHandlersProps extends InputHOCWithHandlersProps, SwitchProps {
	id: string,
	value: string | number | boolean	
}
export interface DropZoneInputHOCWithHandlersProps extends InputHOCWithHandlersProps, DropZoneProps {
	value: DropZoneFile
}

export interface DateRangeInputHOCWithHandlersProps extends InputHOCWithHandlersProps, DateRangeProps {
	value?: DateRangeMap,
	dateFormat?: string
}
export interface DatePickerInputHOCWithHandlersProps extends InputHOCWithHandlersProps, DatePickerProps {
	value?: string,
	dateFormat?: string
}



