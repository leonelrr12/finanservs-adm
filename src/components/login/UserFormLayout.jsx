import styled from 'styled-components'
import { CenteredContainer, SmallContainer as SmallContainerTemplate, Title as TitleTemplate } from '../../theme'
import { FinanservesVerticalLogoImg } from '../images'

const SmallContainer = styled(SmallContainerTemplate)`
    text-align: center;
`

const Header = styled.header`
    text-align: center;
    margin-bottom: ${ ({ theme }) => theme.dims.margin.normal };
`

const Title = styled(TitleTemplate)`
    font-weight: bold;
    font-size: 1em;
    margin: 0px;
    padding: 0px;
    color: #0d6efd;
`

export const UserFormLayout = (props) => {
    return (
        <CenteredContainer>
            <SmallContainer>
                <Header>
                    <FinanservesVerticalLogoImg />
                    <div>
                        <Title>Administración</Title>
                    </div>
                </Header>
                { props.children }
            </SmallContainer>
        </CenteredContainer>
    )
}