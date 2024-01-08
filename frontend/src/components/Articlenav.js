import React, { useContext } from 'react'
import './Articlenav.css';
import Avatar from '@mui/material/Avatar'
import { LoginContext } from './contexProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import DataObjectIcon from '@mui/icons-material/DataObject';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AddLinkIcon from '@mui/icons-material/AddLink';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import ImageIcon from '@mui/icons-material/Image';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
//button
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
//style
// import FormatBoldIcon from '@mui/icons-material/FormatBold';
// import FormatItalicIcon from '@mui/icons-material/FormatItalic';
// import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
// import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

//Button custom style
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#000"),
    backgroundColor: "#02367B",
    '&:hover': {
        backgroundColor: "#006CA5",
    },
}));

const options = [
    'Show some love to MUI',
    'Show all notification content',
    'Hide sensitive notification content',
    'Hide all notification content',
];

const styleOption = [
    'Normal',
    'Heading 1',
    'Heading 2'
];

const Manage = [
    'Preview',
    'Duplicate as draft',
    'SEO setting',
    <hr />,
    'Draft',
    'Scheduled',
    'Published',
    <hr />,
    'Create article',
    'Help',
    'Give feedback'
]

const Articlenav = () => {

    //for validate user.
    const { logindata, setLoginData } = useContext(LoginContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorEM, setAnchorEM] = React.useState(null);
    const [selectedIndexM, setSelectedIndexM] = React.useState(1);
    const openM = Boolean(anchorEM);
    const handleClickListItemM = (event) => {
        setAnchorEM(event.currentTarget);
    };

    const handleMenuItemClickM = (event, index) => {
        setSelectedIndexM(index);
        setAnchorEM(null);
    }

    const handleCloseM = () => {
        setAnchorEM(null);
    };

    return (
        <div>
            <header>
                <nav>
                    <List
                        component="nav"
                        aria-label="Device settings"
                        sx={{ bgcolor: 'background.paper' }}
                    >
                        <ListItem
                            button
                            id="lock-button"
                            aria-haspopup="listbox"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClickListItem}
                        >
                            {logindata?.ValidUserOne ? <Avatar style={{ background: "salmon", marginRight: "10px", fontWeight: "bold", textTransform: "capitalize" }}>{logindata?.ValidUserOne.fname[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ marginRight: "10px", background: "#02367B" }} />}
                            <ListItemText
                                primary={logindata?.ValidUserOne ? (logindata?.ValidUserOne.fname) : ("")}
                                secondary={"individual article"}
                            />
                            < KeyboardArrowDownIcon />
                        </ListItem>
                    </List>
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'lock-button',
                            role: 'listbox',
                        }}
                    >
                        {options.map((option, index) => (
                            <MenuItem
                                key={option}
                                disabled={index === 0}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            margin: '4px',
                            width: 'fit-content',
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            borderRadius: 6,
                            padding: '0px 10px 0px 10px',
                            bgcolor: 'background.paper',
                            color: 'text.secondary',
                            '& svg': {
                                m: 1.5,
                            },
                            '& hr': {
                                mx: 0.5,
                            },
                        }}
                    >
                        {/* <ToggleButtonGroup
                            value={formats}
                            onChange={handleFormat}
                            aria-label="text formatting"
                        >
                            <ToggleButton value="bold" aria-label="bold">
                                <FormatBoldIcon />
                            </ToggleButton>
                            <ToggleButton value="italic" aria-label="italic">
                                <FormatItalicIcon />
                            </ToggleButton>
                        </ToggleButtonGroup> */}
                        
                        <FormatBoldIcon />
                        <FormatItalicIcon />
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <FormatAlignLeftIcon />
                        <FormatAlignCenterIcon />
                        <FormatAlignRightIcon />
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <FormatListBulletedIcon />
                        < FormatListNumberedIcon />
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <FormatQuoteIcon />
                        <DataObjectIcon />
                        <HorizontalRuleIcon />
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <AddLinkIcon />
                        <CodeOffIcon />
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <ImageIcon />
                    </Box>

                    <List
                        sx={{ color: "#02367B", margin: "15px", border: "2px solid #02367B", borderRadius: 6, padding: "0.005px" }}
                    >
                        <ListItem
                            button
                            id="lock-button"
                            aria-haspopup="listbox"
                            aria-expanded={openM ? 'true' : undefined}
                            style={{ borderRadius: 15 }}
                            onClick={handleClickListItemM}
                        >
                            <ListItemText
                                primary={<h5>Manage</h5>}
                            />
                            < KeyboardArrowDownIcon />
                        </ListItem>
                    </List>
                    <Menu
                        anchorEl={anchorEM}
                        open={openM}
                        onClose={handleCloseM}
                        MenuListProps={{
                            'aria-labelledby': 'lock-button',
                            role: 'listbox',
                        }}
                    >
                        {Manage.map((option, index) => (
                            <MenuItem
                                key={option}
                                disabled={index === 0}
                                selected={index === selectedIndexM}
                                onClick={(event) => handleMenuItemClickM(event, index)}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>

                    <ColorButton
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        style={{ borderRadius: 6 }}
                    >
                        Next
                    </ColorButton>
                </nav>
            </header>
        </div>
    )
}

export default Articlenav