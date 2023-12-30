import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './contexProvider/Context';
import "./Dashboard.css";
//Material UI.
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ImageIcon from '@mui/icons-material/Image';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArticleIcon from '@mui/icons-material/Article';
//for Post Card.
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// //download.
import DownloadIcon from '@mui/icons-material/Download';
// import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

//for media
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';


//post.
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

//Media
//for steps.
const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'lightblue',
    border: 'none',
    boxShadow: 24,
    p: 18,
};

const Dashboard = () => {
    //for post card.
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };//end

    const { logindata, setLoginData } = useContext(LoginContext);
    const [data, setData] = useState(false);
    const history = useNavigate();

    const DashboardValid = async () => {
        //getting value of token
        let token = localStorage.getItem("usersdatatoken");

        //calling API
        const res = await fetch("/validuser", {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();
        if (data.status === 401 || data === null) {
            history("");
        } else {
            setLoginData(data);
            history("/dash");
        }
    }

    //Download.
    const handleDownload = async () => {
        try {
            // Fetch post body or any relevant data for download
            const postBody = "Sample post body content"; // Replace this with actual post body retrieval logic

            // Create a Blob from the post body content
            const blob = new Blob([postBody], { type: 'text/plain' });

            // Create a temporary anchor element
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = 'post_body.txt';

            // Trigger the download
            a.click();

            // Clean up
            window.URL.revokeObjectURL(a.href);
        } catch (error) {
            console.error('Error downloading post body:', error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setData(true);
            DashboardValid();
        }, 2000);
    }, []);

    //defining the content of cards.
    const cardContent = Array.from({ length: 6 }).map((_, index) => (
        <>
            {/* post card. */}
            < Card sx={{ marginLeft: "30.2%", marginTop: "23px", maxWidth: 600 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <>
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                            {/* Add download button/icon */}
                            <IconButton aria-label="download" onClick={handleDownload}>
                                <DownloadIcon />
                            </IconButton>
                        </>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    image="https://4.imimg.com/data4/VU/JK/MY-1817237/ncc-uniform.png"
                    alt="Paella-dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                            aside for 10 minutes.
                        </Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                            large plate and set aside, leaving chicken and chorizo in the pan. Add
                            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                            stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                            Add rice and stir very gently to distribute. Top with artichokes and
                            peppers, and cook without stirring, until most of the liquid is absorbed,
                            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                            mussels, tucking them down into the rice, and cook again without
                            stirring, until mussels have opened and rice is just tender, 5 to 7
                            minutes more. (Discard any mussels that don&apos;t open.)
                        </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    ));

    // For Media.
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //for step.
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    //Event
    const [openEvent, setOpenEvent] = React.useState(false);
    const handleOpenEvent = () => setOpenEvent(true);
    const handleCloseEvent = () => setOpenEvent(false);

    //open Article
    const openArticle = () => history("/article");

    return (

        <>
            {
                data ?
                    <>
                        <div className="post-container">
                            <div className="user-info">
                                <img src="https://cdn-icons-png.flaticon.com/128/7009/7009609.png?ga=GA1.1.2046960427.1678348423&track=ais"
                                    alt="User Profile" className="user-profile-picture" />
                                <TextField  label="Write something" fullWidth />
                            </div>

                            <div className="post-interactions">
                                <div className="interaction-option">
                                    <Tooltip title="Media" onClick={handleOpen}>
                                        <IconButton aria-label="Media">
                                            <ImageIcon sx={{ color: "blue" }} />
                                        </IconButton>
                                    </Tooltip>

                                    {/* onclick open media */}
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Stepper activeStep={activeStep}>
                                                {steps.map((label, index) => {
                                                    const stepProps = {};
                                                    const labelProps = {};
                                                    if (isStepOptional(index)) {
                                                        labelProps.optional = (
                                                            <Typography variant="caption">Optional</Typography>
                                                        );
                                                    }
                                                    if (isStepSkipped(index)) {
                                                        stepProps.completed = false;
                                                    }
                                                    return (
                                                        <Step key={label} {...stepProps}>
                                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                                        </Step>
                                                    );
                                                })}
                                            </Stepper>
                                            {activeStep === steps.length ? (
                                                <React.Fragment>
                                                    <Typography sx={{ mt: 2, mb: 1 }}>
                                                        All steps completed - you&apos;re finished
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                        <Box sx={{ flex: '1 1 auto' }} />
                                                        <Button onClick={handleReset}>Reset</Button>
                                                    </Box>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                        <Button
                                                            color="inherit"
                                                            disabled={activeStep === 0}
                                                            onClick={handleBack}
                                                            sx={{ mr: 1 }}
                                                        >
                                                            Back
                                                        </Button>
                                                        <Box sx={{ flex: '1 1 auto' }} />
                                                        {isStepOptional(activeStep) && (
                                                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                                                Skip
                                                            </Button>
                                                        )}

                                                        <Button onClick={handleNext}>
                                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                        </Button>
                                                    </Box>
                                                </React.Fragment>
                                            )}
                                        </Box>
                                    </Modal>

                                </div>
                                <div className="interaction-option">
                                    <Tooltip title="Event" onClick={handleOpenEvent}>
                                        <IconButton>
                                            <CalendarMonthIcon sx={{ color: "olive" }} />
                                        </IconButton>
                                    </Tooltip>

                                    {/* onclick open Event */}
                                    <Modal
                                        open={openEvent}
                                        onClose={handleCloseEvent}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <h1 align="center">Scheduale Post</h1>
                                            <TextField>write Title</TextField>
                                            <TextField>write Body</TextField>
                                            <Button>SAVE</Button>
                                        </Box>
                                    </Modal>
                                </div>
                                <div className="interaction-option">
                                    <Tooltip title="Article" onClick={openArticle}>
                                        <IconButton>
                                            <ArticleIcon sx={{ color: "orange" }} />
                                        </IconButton>
                                    </Tooltip>

                                </div>
                            </div>
                        </div>
                        <Divider variant="inset" />
                        {/* rendering number of post cards */}
                        {cardContent}
                    </> :
                    <Box sx={{ display: 'flex', margin: "45%", justifycontent: "center", alignItems: "center", height: "100vh" }}>
                        Loading... &nbsp;
                        <CircularProgress />
                    </Box>
            }
        </>
    )
}

export default Dashboard;