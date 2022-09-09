import styled from 'styled-components'
import { theme } from '../theme';


export const Fieldset = styled.fieldset`
    border: 0;
    max-width: ${ theme.dims.widths.forms };
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    margin-top: ${ theme.dims.margin.intersection };
    padding: 0;
    & label {
        opacity: 0.56;
    }
`

const Input = styled.input`
  padding: ${ theme.dims.padding.largePadding};
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-top: ${ theme.dims.margin.small};
  outline: none;
  border: none;
  border-radius: ${ theme.dims.borderRadius.normal};
  background-color: ${ theme.colors.gray};
  border: solid 1px;
  border-color: ${ theme.colors.silver};
`;

export const AppInput = (props) => {

    return (
        <Fieldset>
            <label htmlFor="">{props.label}</label>
            <Input { ...props } { ...props.register(props.name) }></Input>
        </Fieldset>
    )
}
