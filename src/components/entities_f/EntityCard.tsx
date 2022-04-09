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
    entity: {
        id: number;
        name: string;
        id_ruta: string;
        contact: string;
        phone_number: string;
        cellphone: string;
        emails: string;
        is_active: string;
    };
    onClick: (is_active: string) => void;
}

export const EntityCard: FC<IEntidadProps> = ({ entity, onClick }) => {

    return (
        <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
            onClick={ () => onClick(entity.is_active) }
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {entity.name?.slice(0,1)}
                    </Avatar>
                }
                title={entity.name}
            />
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">{ entity.contact }</Typography>
                    <Typography gutterBottom variant="h6" component="div">{ entity.cellphone } / { entity.phone_number }</Typography>
                    <Typography gutterBottom variant="h6" component="div">Email:</Typography>
                    <Typography gutterBottom component="div">{ entity.emails }</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', padding: 2 }}>
                    <Typography variant='body2'>Activo: { entity.is_active }</Typography>
                </CardActions>
            </CardActionArea>
          </Card>
    )
}
