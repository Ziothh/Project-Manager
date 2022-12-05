import FolderWhiteSvg from '@workspace/assets/svgs/folder-white.svg';
import FolderSvg from '@workspace/assets/svgs/folder.svg';
import clsx from 'clsx';
import { FC } from 'react';

interface FolderProps {
	/**
	 * Append additional classes to the underlying SVG
	 */
	className?: string;

	/**
	 * Render a white folder icon
	 */
	white?: boolean;

	/**
	 * The size of the icon to show -- uniform width and height
	 */
	size?: number;
}

export const Folder: FC<FolderProps> = ({
    size,
    white,
    className
}) => {
    const C = white ? FolderWhiteSvg : FolderSvg

    return <C className={clsx("w-full", className)} style={size ? {maxWidth: `${size}px`} : undefined} />

	// return (
	// 	<img
	// 		className={props.className}
	// 		width={size}
	// 		height={size}
	// 		src={props.white ? folderWhiteSvg : folderSvg}
	// 		alt="Folder icon"
	// 	/>
	// );
}
