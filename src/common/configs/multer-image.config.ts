import { UnsupportedMediaTypeException } from '@nestjs/common';
import { memoryStorage } from 'multer';

const mimeTypes: readonly string[] = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'image/webp',
];

export const imageConfig = {
	storage: memoryStorage(),
	limits: {
		fileSize: 10 * 1024 * 1024,
	},
	fileFilter: (
		_: Request,
		file: Express.Multer.File,
		callback: (error: Error | null, acceptFile: boolean) => void,
	) => {
		if (!mimeTypes.includes(file.mimetype)) {
			return callback(
				new UnsupportedMediaTypeException('Unsupported file type.'),
				false,
			);
		}
		callback(null, true);
	},
} as const;
