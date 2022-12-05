import Ellipsis from '@workspace/assets/svgs/ellipsis.svg';
// import {
// 	LocationCreateArgs,
// 	getDebugState,
// 	useBridgeQuery,
// 	useCurrentLibrary,
// 	useDebugState,
// 	useLibraryMutation,
// 	useLibraryQuery
// } from '@sd/client';
import {
	Button,
	ButtonLink,
	CategoryHeading,
	Dropdown,
	Loader,
	OverlayPanel,
	Select,
	SelectOption,
	Switch,
	cva,
	tw,
    AppLinkProps,
    AppLink
} from '~/components/primitives';
import clsx from 'clsx';
import {
	CheckCircle,
	CirclesFour,
	Gear,
	GearSix,
	Lock,
	Planet,
	Plus,
	ShareNetwork
} from 'phosphor-react';
import React, { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
// import { NavLink, NavLinkProps } from 'react-router-dom';

// import { useOperatingSystem } from '../../hooks/useOperatingSystem';
// import { usePlatform } from '../../util/Platform';
import CreateLibraryDialog from '../dialog/CreateLibraryDialog';
import { Folder } from '../icons/Folder';
// import { JobsManager } from '../jobs/JobManager';
// import { MacTrafficLights } from '../os/TrafficLights';
// import { InputContainer } from '../primitive/InputContainer';
import Link, { LinkProps } from 'next/link';
import { useRouter, usePathname } from "next/navigation"
import { SIDEBAR_NAV_ITEMS } from '~/constants';
import { trpc, type RouterOutputs } from '~/utils/trpc';
import type {Project, ProjectRoot} from "@prisma/client"
import { useAppCtx } from '~/features/global';

const SidebarBody = tw.div`flex relative flex-col flex-grow-0 flex-shrink-0 w-48 min-h-full px-2.5 border-r border-sidebar-divider bg-sidebar`;

const SidebarHeader = tw.div``
const SidebarContents = tw.div`flex flex-col px-2.5 flex-grow pt-1 pb-10 overflow-x-hidden overflow-y-auto no-scrollbar mask-fade-out`;

const SidebarFooter = tw.div`flex flex-col mb-3 px-2.5`;

// TODO: remove
const PROJECT_ROOTS = [
    "One",
    "Two",
    "Three"
]

// type TQueriedProject = NonNullable<ReturnType<typeof trpc.projectRoot.getAll.useQuery>["data"]>[number];
type TQueriedProjectRoot = RouterOutputs["projectRoot"]["getAll"][number];

export function Sidebar() {
	// DO NOT DO LIBRARY QUERIES OR MUTATIONS HERE. This is rendered before a library is set.
	// const os = useOperatingSystem();
    // const {project, isLoading: isLoadingProjects} = {project: PROJECT_ROOTS[0], isLoading: false}
	// const { library, libraries, isLoading: isLoadingLibraries, switchLibrary } = useCurrentLibrary();
	// const debugState = useDebugState();

    const {currentProfile,} = useAppCtx()
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);



  

	return (
		// <SidebarBody className={'bg-opacity-[0.80]'}>
		<SidebarBody className={'no-scrollbar overflow-x-hidden overflow-y-auto !bg-gray-850 border-gray-600'}>
			{/* <WindowControls /> */}

            {/* Header */}
            <ProfileSelect/>

            {/* Main content */}
			<SidebarContents>
				<div className="pt-1">
					{SIDEBAR_NAV_ITEMS.map(i => (
                        <SidebarLink key={i.label + i.href} href={i.href}>
                            <Icon component={i.icon} />
                            {i.label}
                        </SidebarLink>
                    ))}
				</div>
				{/* {project && <LibraryScopedSection />} */}
                {currentProfile && <FavoritedProjects profile={currentProfile} />}
				<div className="flex-grow" />
			</SidebarContents>
            
            {/* Footer */}
			<SidebarFooter>
				<div className="flex items-end">
					<ButtonLink
						// href="/settings/general"
						href={(r) => r.NOT_IMPLEMENTED}
						size="icon"
						variant="outline"
						className="text-ink-faint"
					>
						<Gear className="w-5 h-5" />
					</ButtonLink>
                    
                    <div className="flex-grow"/>
                    {/* Maybe add job manager for folder syncing? */}
					<OverlayPanel
						className="focus:outline-none"
						transformOrigin="bottom left"
						disabled={false /* !currentProfile */}
						trigger={
							<Button
								size="icon"
								variant="outline"
								className="radix-state-open:bg-sidebar-selected/50 text-ink-faint"
							>
                                {/* TODO */}
								{/* currentProfile */ true && <IsRunningJob />}
							</Button>
						}
					>
						<div className="block w-[430px] h-96">
							{/* <JobsManager /> */}
						</div>
					</OverlayPanel>
				</div>
				{/* {debugState.enabled && <DebugPanel />} */}
			</SidebarFooter>
			{/* Putting this within the dropdown will break the enter click handling in the modal. */}
			<CreateLibraryDialog open={isCreateDialogOpen} setOpen={setIsCreateDialogOpen} />
		</SidebarBody>
	);
}

interface ProfileSelectProps {

}
const ProfileSelect: React.FC<ProfileSelectProps> = ({}) => {
    const {
        allProfilesQuery: {
            data: profiles,
            isLoading
        },
        currentProfile,
        setCurrentProfile,
    } = useAppCtx()

    return (
        <SidebarHeader>
            <Dropdown.Root
                className="mt-2 mx-2.5"
                // we override the sidebar dropdown item's hover styles
                // because the dark style clashes with the sidebar
                itemsClassName="dark:bg-sidebar-box mt-1 dark:divide-menu-selected/30"
                button={
                    <Dropdown.Button
                        variant="gray"
                        className={clsx(
                            `w-full text-ink `,
                            // these classname overrides are messy
                            // but they work
                            `!bg-sidebar-box !border-sidebar-line/50 active:!border-sidebar-line active:!bg-sidebar-button ui-open:!bg-sidebar-button ui-open:!border-sidebar-line`,
                            // (library === null || isLoadingLibraries) && '!text-ink-faint'
                        )}
                    >
                        <span className="truncate">
                            {isLoading ? 'Loading...' : currentProfile ? currentProfile.name : 'No profile set'}
                        </span>
                    </Dropdown.Button>
                }
            >
                <Dropdown.Section>
                    {profiles?.map((p) => (
                        <Dropdown.Item
                            selected={p.id === currentProfile?.id}
                            key={p.id}
                            onClick={() => setCurrentProfile(p)}
                        >
                            {p.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Section>
                <Dropdown.Section>
                    <Dropdown.Item disabled icon={GearSix} href="settings/library">
                        Profile Settings
                    </Dropdown.Item>
                    <Dropdown.Item icon={Plus} onClick={() => undefined /* setIsCreateDialogOpen(true) */}>
                        Add Library
                    </Dropdown.Item>
                    <Dropdown.Item disabled icon={Lock} onClick={() => alert('TODO: Not implemented yet!')}>
                        Lock
                    </Dropdown.Item>
                </Dropdown.Section>
            </Dropdown.Root>
        </SidebarHeader>
    )
}



function IsRunningJob() {
	// const { data: isRunningJob } = useLibraryQuery(['jobs.isRunning']);
    // TODO
	const { data: isRunningJob } = {
        data: true
    };

	return isRunningJob ? (
		// <Loader className="w-[20px] h-[20px]" />
		<Loader className="!w-5 !h-5" />
	) : (
		<CheckCircle className="w-5 h-5" />
	);
}

// function DebugPanel() {
// 	const buildInfo = useBridgeQuery(['buildInfo']);
// 	const nodeState = useBridgeQuery(['nodeState']);
// 	const debugState = useDebugState();
// 	const platform = usePlatform();

// 	return (
// 		<OverlayPanel
// 			className="p-4 focus:outline-none"
// 			transformOrigin="bottom left"
// 			trigger={
// 				<h1 className="w-full ml-1 mt-1 text-[7pt] text-ink-faint/50">
// 					v{buildInfo.data?.version || '-.-.-'} - {buildInfo.data?.commit || 'dev'}
// 				</h1>
// 			}
// 		>
// 			<div className="block w-[430px] h-96">
// 				<InputContainer
// 					mini
// 					title="rspc Logger"
// 					description="Enable the logger link so you can see what's going on in the browser logs."
// 				>
// 					<Switch
// 						checked={debugState.rspcLogger}
// 						onClick={() => (getDebugState().rspcLogger = !debugState.rspcLogger)}
// 					/>
// 				</InputContainer>
// 				{platform.openPath && (
// 					<InputContainer
// 						mini
// 						title="Open Data Directory"
// 						description="Quickly get to your Spacedrive database"
// 					>
// 						<div className="mt-2">
// 							<Button
// 								size="sm"
// 								variant="gray"
// 								onClick={() => {
// 									if (nodeState?.data?.data_path) platform.openPath!(nodeState?.data?.data_path);
// 								}}
// 							>
// 								Open
// 							</Button>
// 						</div>
// 					</InputContainer>
// 				)}
// 				<InputContainer
// 					mini
// 					title="React Query Devtools"
// 					description="Configure the React Query devtools."
// 				>
// 					<Select
// 						value={debugState.reactQueryDevtools}
// 						size="sm"
// 						onChange={(value) => (getDebugState().reactQueryDevtools = value as any)}
// 					>
// 						<SelectOption value="disabled">Disabled</SelectOption>
// 						<SelectOption value="invisible">Invisible</SelectOption>
// 						<SelectOption value="enabled">Enabled</SelectOption>
// 					</Select>
// 				</InputContainer>

// 				{/* {platform.showDevtools && (
// 					<InputContainer
// 						mini
// 						title="Devtools"
// 						description="Allow opening browser devtools in a production build"
// 					>
// 						<div className="mt-2">
// 							<Button size="sm" variant="gray" onClick={platform.showDevtools}>
// 								Show
// 							</Button>
// 						</div>
// 					</InputContainer>
// 				)} */}
// 			</div>
// 		</OverlayPanel>
// 	);
// }

const sidebarItemClass = cva(
	'max-w mb-[2px] rounded px-2 py-1 gap-0.5 flex flex-row flex-grow items-center font-medium truncate text-sm',
	{
		variants: {
			isActive: {
				true: 'bg-sidebar-selected/40 text-ink',
				false: 'text-ink-dull'
			},
			isTransparent: {
				true: 'bg-opacity-90',
				false: ''
			}
		}
	}
);

export const SidebarLink = ({
    children,
    ...props
}: PropsWithChildren<AppLinkProps>) => {
	// const os = useOperatingSystem();
    const pathName = usePathname()

	return (
		<AppLink {...props}>
			{({isActive}) => (  
                <span
                className={clsx(
                    // sidebarItemClass({ isActive, isTransparent: os === 'macOS' }),
                    sidebarItemClass({ 
                        isActive, 
                        isTransparent: true 
                    }),
                    props.className
                )}
                >
                    {children}
                </span>
            )}
		</AppLink>
	);
};

const SidebarSection: React.FC<{
	name: string;
	actionArea?: React.ReactNode;
	children: React.ReactNode;
}> = (props) => {
	return (
		<div className="mt-5 group">
			<div className="flex items-center justify-between mb-1">
				<CategoryHeading className="ml-1">{props.name}</CategoryHeading>
				<div className="transition-all duration-300 opacity-0 text-ink-faint group-hover:opacity-30 hover:!opacity-100">
					{props.actionArea}
				</div>
			</div>
			{props.children}
		</div>
	);
};

const SidebarHeadingOptionsButton: React.FC<{ href: string; icon?: React.FC }> = (props) => {
	const Icon = props.icon ?? Ellipsis;
	return (
		<Link href={props.href}>
			<Button className="!p-[5px]" variant="outline">
				<Icon className="w-3 h-3" />
			</Button>
		</Link>
	);
};

// const LibraryScopedSection: FC = () => (
//     <p>Libary scoped section</p>
// )
const FavoritedProjects: FC<{profile: Pick<Project, "id">}> = ({profile}) => {
// const platform = usePlatform();
	// const { data: locations } = useLibraryQuery(['locations.list'], { keepPreviousData: true });
	// const { data: tags } = useLibraryQuery(['tags.list'], { keepPreviousData: true });
	// const { mutate: createLocation } = useLibraryMutation('locations.create');

    const {data: projects, isLoading} = trpc.projectRoot.getAll.useQuery({
        profileId: profile.id,
    })

    const hightlightedProjects = useMemo(() => {
        if (isLoading || !projects) return undefined

        const favorited = projects.filter(p => p.isFavorited)
        .slice(0, 4)

        const favoritedLength = favorited.length

        const fill = favoritedLength < 4
        ? projects.filter(
            p => favorited.find(
                f => f.id === p.id
            ) === undefined
        )
            .slice(0, 4 - favoritedLength)
        : []



        return [...favorited, ...fill]
    }, [projects])


	return (
		<>
			<div>
				<SidebarSection
					name="Locations"
					actionArea={
						<>
							{/* <SidebarHeadingOptionsButton to="/settings/locations" icon={CogIcon} /> */}
							<SidebarHeadingOptionsButton href="/settings/locations" />
						</>
					}
				>
					{!isLoading && hightlightedProjects?.map((p) => {
                        const isActive = false // TODO
						return (
							<div key={p.absolutePath} className="flex flex-row items-center">
								<AppLink
									className="relative w-full group"
									href={(r) => r.NOT_IMPLEMENTED} // TODO
								>
                                    <span className={sidebarItemClass({ isActive })}>
                                        <div className="-mt-0.5 mr-1 flex-grow-0 flex-shrink-0">
                                            <Folder size={18} />
                                        </div>

                                        <span className="flex-grow flex-shrink-0">{p.name}</span>
                                    </span>
								</AppLink>
							</div>
						);
					})}
                    {/* Add button */}
					{((true || (projects?.length || 0) < 4)) && (
						<button
							onClick={() => {
								// if (!platform.openFilePickerDialog) {
								// 	// TODO: Support opening locations on web
								// 	alert('Opening a dialogue is not supported on this platform!');
								// 	return;
								// }
								// platform.openFilePickerDialog().then((result) => {
								// 	// TODO: Pass indexer rules ids to create location
								// 	if (result)
								// 		createLocation({
								// 			path: result as string,
								// 			indexer_rules_ids: []
								// 		} as LocationCreateArgs);
								// });
							}}
							className={clsx(
								'w-full px-2 py-1 mt-1 text-xs font-medium text-center',
								'rounded border border-dashed border-sidebar-line hover:border-sidebar-selected',
								'cursor-normal transition text-ink-faint'
							)}
						>
							Add Location
						</button>
					)}
				</SidebarSection>
			</div>
			{/* {!!tags?.length && (
				<SidebarSection
					name="Tags"
					actionArea={<SidebarHeadingOptionsButton href="/settings/tags" />}
				>
					<div className="mt-1 mb-2">
						{tags?.slice(0, 6).map((tag, index) => (
							<SidebarLink key={index} to={`tag/${tag.id}`} className="">
								<div
									className="w-[12px] h-[12px] rounded-full"
									style={{ backgroundColor: tag.color || '#efefef' }}
								/>
								<span className="ml-1.5 text-sm">{tag.name}</span>
							</SidebarLink>
						))}
					</div>
				</SidebarSection>
			)} */}
		</>
	);
}

const Icon: FC<{component: FC} & (Object & {[key: string]: any})> = ({ component: Icon, ...props }: any) => (
	<Icon weight="bold" {...props} className={clsx('w-4 h-4 mr-2', props.className)} />
);

// cute little helper to decrease code clutter
const macOnly = (platform: string | undefined, classnames: string) =>
	platform === 'macOS' ? classnames : '';

// function WindowControls() {
// 	const { platform } = usePlatform();

// 	const showControls = window.location.search.includes('showControls');
// 	if (platform === 'tauri' || showControls) {
// 		return (
// 			<div data-tauri-drag-region className="flex-shrink-0 h-7">
// 				{/* We do not provide the onClick handlers for 'MacTrafficLights' because this is only used in demo mode */}
// 				{/* {showControls && <MacTrafficLights className="z-50 absolute top-[13px] left-[13px]" />} */}
// 			</div>
// 		);
// 	}

// 	return null;
// }
