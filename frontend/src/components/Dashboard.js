import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './contexProvider/Context';
import "./Dashboard.css";
//Material UI.
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
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
//for media
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
//for post:
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
//for event
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import axios from 'axios';

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

//for upload styling
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
}, ({ theme }) => ({
    color: theme.palette.getContrastText("#000"),
    backgroundColor: "#02367B",
    '&:hover': {
        backgroundColor: "#006CA5",
    },
}));

//for post write something here.
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

//style input field start
const StyledInput = styled(Input)(
    ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  }
`,
);

const Label = styled(({ children, className }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
        if (formControlContext?.filled) {
            setDirty(true);
        }
    }, [formControlContext]);

    if (formControlContext === undefined) {
        return <p>{children}</p>;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
        <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
            {children}
            {required ? ' *' : ''}
        </p>
    );
})
    `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`

const HelperText = styled((props) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
        if (formControlContext?.filled) {
            setDirty(true);
        }
    }, [formControlContext]);

    if (formControlContext === undefined) {
        return null;
    }

    const { required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};
//input style end

const Dashboard = () => {
    //for post card.
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    //end

    //to store post data by user.
    const [card, setCard] = React.useState([]);
    useEffect(() => {
        let token = localStorage.getItem("usersdatatoken");
        fetch('/allPost', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setCard(result.posts)
            })
    }, [])

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

        if (data.status === 401 || !data) {
            history("*");
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
            DashboardValid();
            setData(true);
        }, 2000);
    }, []);



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

    //event start
    const [openevent, setOpenevent] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpenevent = (scrollType) => () => {
        setOpenevent(true);
        setScroll(scrollType);
    };

    const handleCloseevent = () => {
        setOpenevent(false);
    };

    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
        if (openevent) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openevent]);
    // end event

    //open Article
    const openArticle = () => history("/article");

    //post something ui
    const [openp, setOpenp] = React.useState(false);

    const handleClickOpenp = () => {
        setOpenp(true);
    };
    const handleClosep = () => {
        setOpenp(false);
    };

    return (

        <>
            {
                data ?
                    <>
                        <div className="post-container" style={{
                            bgcolor: "rgb(239, 236, 233)"
                        }}>
                            <div className="user-info">
                                <img src="https://cdn-icons-png.flaticon.com/128/7009/7009609.png?ga=GA1.1.2046960427.1678348423&track=ais"
                                    alt="User Profile" className="user-profile-picture" onClick={() => { }} />
                                <React.Fragment>
                                    <Button style={{ borderRadius: 22, maxWidth: "580px", padding: "10px", color: "#808080", textDecorationColor: "black", border: "1px solid #808080" }} fullWidth variant="outlined" onClick={handleClickOpenp}>
                                        <p>Start a post...</p>
                                    </Button>
                                    {/* dialog content */}
                                    <BootstrapDialog
                                        onClose={handleClosep}
                                        aria-labelledby="customized-dialog-title"
                                        open={openp}
                                    >
                                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                            Modal title
                                        </DialogTitle>
                                        <IconButton
                                            aria-label="close"
                                            onClick={handleClosep}
                                            sx={{
                                                position: 'absolute',
                                                right: 8,
                                                top: 8,
                                                color: (theme) => theme.palette.grey[500],
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        <DialogContent dividers>
                                            <Typography gutterBottom>
                                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                                consectetur ac, vestibulum at eros.
                                            </Typography>
                                            <Typography gutterBottom>
                                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                            </Typography>
                                            <Typography gutterBottom>
                                                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                                                magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                                                ullamcorper nulla non metus auctor fringilla.
                                            </Typography>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus onClick={handleClosep}>
                                                Save changes
                                            </Button>
                                        </DialogActions>
                                    </BootstrapDialog>
                                </React.Fragment>
                                {/* dialog content end */}
                            </div>

                            <div className="post-interactions">
                                <div className="interaction-option">
                                    <IconButton aria-label="Media" onClick={handleOpen}>
                                        <ImageIcon sx={{ color: "blue" }} />
                                    </IconButton>
                                    <small>Media</small>

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
                                    {/*media dialog end  */}

                                </div>
                                <div className="interaction-option">
                                    <IconButton onClick={handleClickOpenevent('paper')}>
                                        <CalendarMonthIcon sx={{ color: "olive" }} />
                                    </IconButton>
                                    <small>Event</small>

                                    {/* onclick open Event */}
                                    <React.Fragment>
                                        <Dialog
                                            open={openevent}
                                            onClose={handleCloseevent}
                                            scroll={scroll}
                                            aria-labelledby="scroll-dialog-title"
                                            aria-describedby="scroll-dialog-description"
                                        >
                                            <DialogTitle id="scroll-dialog-title" display={"flex"}>
                                                Create an event
                                                <IconButton
                                                    style={{ display: "flex", justifyContent: "flex-end", marginLeft: "auto" }}
                                                    edge="start"
                                                    color="inherit"
                                                    onClick={handleCloseevent}
                                                    aria-label="close"
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </DialogTitle>
                                            <DialogContent dividers={scroll === 'paper'}>
                                                <DialogContentText
                                                    id="scroll-dialog-description"
                                                    ref={descriptionElementRef}
                                                    tabIndex={-1}
                                                >
                                                    {
                                                        <>
                                                            <div >
                                                                <Button style={{ bgcolor: "rgb(239, 236, 233)", color: '#808080', border: 'none', marginBottom: "10px", width: "530px", height: "300px", position: 'relative', padding: "30px" }} component="label" variant="filled" >
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                                        <p><CameraEnhanceIcon style={{ fontSize: '6rem' }} /></p><br />
                                                                        <p style={{ textDecorationColor: 'black', textAlign: 'center', marginTop: '10px', }}>
                                                                            <b>Upload cover image</b><br />
                                                                            Mininum width 480 pixel, 16:9 recommended
                                                                        </p>
                                                                    </div>
                                                                    <VisuallyHiddenInput type="file" />
                                                                </Button>
                                                                <VisuallyHiddenInput type="button" value={'test'} />
                                                                <div style={{ justifyContent: "space-evenly" }}>
                                                                    {/* Event type */}
                                                                    <FormControl>
                                                                        <FormLabel id="demo-row-radio-buttons-group-label">Event type</FormLabel>
                                                                        <RadioGroup
                                                                            row
                                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                                            name="row-radio-buttons-group"
                                                                        >
                                                                            <FormControlLabel value="Online" control={<Radio />} label="Online" />
                                                                            <FormControlLabel value="In person" control={<Radio />} label="In person" />
                                                                        </RadioGroup>
                                                                    </FormControl><br />

                                                                    {/* input field */}
                                                                    <FormControl defaultValue="" required>
                                                                        <Label>Event name*</Label>
                                                                        <StyledInput fullWidth />
                                                                        <HelperText />
                                                                    </FormControl>
                                                                    {/* time zone */}
                                                                    <FormControl defaultValue="" required>
                                                                        <Label>Time zone*</Label>
                                                                        <StyledInput fullWidth />
                                                                        <HelperText />
                                                                    </FormControl>
                                                                    {/* Time and daate picker */}
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                        <DemoItem label="Mobile variant">
                                                                            <MobileDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                                                                        </DemoItem>
                                                                    </LocalizationProvider>
                                                                    {/* external links */}
                                                                    <FormControl defaultValue="" required>
                                                                        <Label>External link*</Label>
                                                                        <StyledInput fullWidth />
                                                                        <HelperText />
                                                                    </FormControl>
                                                                    {/* Description */}
                                                                    <Label>Description</Label>
                                                                    <TextareaAutosize aria-label="empty textarea" minLength={"560px"} placeholder="Empty" />
                                                                    {/* Speakers */}
                                                                    <FormControl defaultValue="" required>
                                                                        <Label>Speakers</Label>
                                                                        <StyledInput fullWidth />
                                                                        <HelperText />
                                                                    </FormControl>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleCloseevent}>Cancel</Button>
                                                <Button onClick={handleCloseevent}>Subscribe</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </React.Fragment>
                                    {/* event dialog end */}
                                </div>
                                <div className="interaction-option">
                                    <IconButton onClick={openArticle}>
                                        <ArticleIcon sx={{ color: "orange" }} />
                                    </IconButton>
                                    <small>Write article</small>
                                </div>
                            </div>
                        </div>
                        <Divider width="600px" style={{ marginLeft: "450px" }} />
                        {/* rendering number of post cards */}
                        {card.map(item => (
                            <div key={item._id}>
                                <>
                                    {/* post card. */}
                                    < Card sx={{ marginLeft: "30.2%", marginTop: "23px", maxWidth: 600 }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                    {item.postedBy.fname[0].toUpperCase()}
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
                                            title={item.postedBy.fname}
                                            subheader={item.createdAt}
                                        />
                                        <CardMedia
                                            component="img"
                                            image={item.photo}
                                            alt="Paella-dish"
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.title}
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
                                                <Typography paragraph>Details:</Typography>
                                                <Typography paragraph>
                                                    {item.body}
                                                </Typography>
                                            </CardContent>
                                        </Collapse>
                                    </Card>
                                </>
                            </div>
                        ))}
                        {/* end */}
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