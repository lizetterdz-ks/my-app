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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    color:'#ffff',
    bgcolor: '#464F76',
    border: '2px solid #464F76',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };

export default function Films({ data }) {
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
                    <Grid item xs='auto' md={4} key={films.episode_id} id={films.episode_id}>
                        <Card sx={{ width: 345, padding: 2}}>
                            <CardMedia
                            component="img"
                            height="480"  
                            src={filmsImages[films.episode_id]}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {films.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {films.director}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {films.release_date}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                size="small" 
                                variant="outlined"
                                color="secondary"
                                onClick={()=> handleOpen(films.opening_crawl)}>
                                    See opening
                                </Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h5" component="h1">
                                        Opening crawl
                                        </Typography>
                                        <Typography id="modal-modal-description"  sx={{ mt: 2 }}>
                                            {crawl}
                                        </Typography>
                                    </Box>
                                </Modal>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    )
}
