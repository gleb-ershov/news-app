import {
	Button,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const DRAWER_WIDTH = 320;

export const Component = () => {
	const [drawerVisible, toggleDrawer] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch("http://localhost:5050/api/news");
			console.log(await data.json());
		};
		fetchData();
	}, []);

	return (
		<>
			<Button onClick={() => toggleDrawer(!drawerVisible)}>click</Button>
			<Drawer
				sx={{
					width: DRAWER_WIDTH,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: DRAWER_WIDTH,
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={drawerVisible}
			>
				<IconButton onClick={() => toggleDrawer(!drawerVisible)}>
					<ChevronLeftIcon />
					<ChevronRightIcon />
				</IconButton>
				<Divider />
				<List>
					{["Inbox", "Starred", "Send email", "Drafts"].map(
						(text, index) => (
							<ListItem key={text} disablePadding>
								<ListItemButton>
									<ListItemIcon>
										{index % 2 === 0 ? (
											<InboxIcon />
										) : (
											<MailIcon />
										)}
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						)
					)}
				</List>
				<Divider />
				<List>
					{["All mail", "Trash", "Spam"].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									{index % 2 === 0 ? (
										<InboxIcon />
									) : (
										<MailIcon />
									)}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</>
	);
};
