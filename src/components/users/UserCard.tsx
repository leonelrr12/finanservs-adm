import { red } from '@mui/material/colors';
import { 
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Typography,
    CardActionArea,
    CardActions, 
} from '@mui/material'
import { FC } from 'react';

interface IEntidadProps {
    user: {
        id: number;
        email: string;
        Role: string;
        Entidad: string;
        name: string;
        cellPhone: string;
        phoneNumber: string;
        address: string;
        is_active: string;
    };
    onClick: (is_active: string) => void;
}

export const UserCard: FC<IEntidadProps> = ({ user, onClick }) => {

    return (
        <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
            onClick={ () => onClick(user.is_active) }
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {user.name?.slice(0,1)}
                    </Avatar>
                }
                title={user.name}
            />
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom component="div">Usuario: <b>{ user.email }</b></Typography>
                    <Typography gutterBottom component="div">Role: <b>{ user.Role }</b></Typography>
                    <Typography gutterBottom component="div">Entidad: <b>{ user.Entidad }</b></Typography>
                    <Typography gutterBottom component="div">Teléfonos: <b>{ user.cellPhone } / { user.phoneNumber }</b></Typography>
                    <Typography gutterBottom component="div">Dirección: <b>{ user.address }</b></Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', padding: 2 }}>
                    <Typography variant='body2'>Activo: { user.is_active }</Typography>
                </CardActions>
            </CardActionArea>
          </Card>
    )
}
