import React from 'react'; 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {filmsImages} from '../films-images'
import { ThemeContext } from '../App';
import { styled, alpha } from '@mui/material/styles';

export default function Films({ data }) {
    const appTheme = React.useContext(ThemeContext);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: 300, 
            sm: 350, 
            md: 375, 
            lg: 400, 
            xl: 425, 
        },
        color: appTheme.color,
        bgcolor: appTheme.background,
        border: '2px solid',
        bordercolor: appTheme.color,
        borderRadius: 3,
        boxShadow: 24,
        overflow: 'auto',
        p: 4,
    };

    const CrawlButton = styled(Button)(() => ({
        color: appTheme.color,
        border: '1px solid', 
        bordercolor: appTheme.color,
        '&:hover': {
            border: '1px solid', 
            bordercolor: appTheme.color,
            backgroundColor: appTheme.accent,
        },
    }));

    const [open, setOpen] = React.useState(false);
    const [crawl, setCrawl] = React.useState('');

    const handleOpen = (crawl) => {
        setCrawl(crawl);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return (
        <Grid container spacing={2} wrap='wrap' sx={{display: 'flex', justifyContent: 'center'}}>
            {data.map((films, i) => {

                return (
                    <Grid item xs='auto' md={4} key={films.episode_id}>
                        <Card sx={{ width: 345, padding: 2, background: alpha(appTheme.background, 0.8)}}>
                            <CardMedia
                            component="img"
                            height="480"  
                            src={filmsImages[films.episode_id]}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" color={appTheme.color}>
                                    {films.title}
                                </Typography>
                                <Typography variant="body2" color={appTheme.color}>
                                    {films.director}
                                </Typography>
                                <Typography variant="body2" color={appTheme.color}>
                                    {films.release_date}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <CrawlButton 
                                size="small" 
                                variant="outlined"
                                onClick={()=> handleOpen(films.opening_crawl)}>
                                    See opening
                                </CrawlButton>
                                
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h5" component="h1">
                    Opening crawl
                    </Typography>
                    <Typography id="modal-modal-description"  sx={{ mt: 2 }}>
                        {crawl}
                    </Typography>
                </Box>
            </Modal>
        </Grid>
    )
    
}
