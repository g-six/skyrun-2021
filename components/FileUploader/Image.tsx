import Dropzone, {
    formatBytes,
    formatDuration,
    IDropzoneProps,
    IFileWithMeta,
    IInputProps,
    ILayoutProps,
    Input,
    IPreviewProps,
    StatusValue,
} from 'react-dropzone-uploader'
import { ReactNode } from 'react'
import { ModalDataAttributes } from 'components/Modals/types'

export function ImageFileUploaderLayout(props: ILayoutProps) {
    const {
        input,
        previews,
        submitButton,
        dropzoneProps,
        files,
        extra: { maxFiles },
    } = props

    return (
        <div {...dropzoneProps}>
            <div className="relative w-full h-full">
                {previews}

                {files.length < maxFiles && input}

                {files.length > 0 && submitButton}
            </div>
        </div>
    )
}

export function ImageFileUploaderPreview(
    props: {
        RemoveButton?: ReactNode
    } & IPreviewProps
) {
    const {
        className,
        style,
        meta: {
            name = '',
            percent = 0,
            size = 0,
            previewUrl,
            status,
            duration,
            validationError,
        },
        imageClassName,
        imageStyle,
        fileWithMeta: { cancel, remove, restart },
        isUpload,
        canCancel,
        canRemove,
        canRestart,
        extra: { minSizeBytes },
    } = props

    let title = `${name || '?'}, ${formatBytes(size)}`
    if (duration) title = `${title}, ${formatDuration(duration)}`

    if (status === 'error_file_size' || status === 'error_validation') {
        return (
            <div className={className} style={style}>
                <span className="dzu-previewFileNameError">{title}</span>
                {status === 'error_file_size' && (
                    <span>
                        {size < minSizeBytes
                            ? 'File too small'
                            : 'File too big'}
                    </span>
                )}
                {status === 'error_validation' && (
                    <span>{String(validationError)}</span>
                )}
                {canRemove && !props.RemoveButton && (
                    <span
                        className="dzu-previewButton feather-trash"
                        onClick={remove}
                    />
                )}
            </div>
        )
    }

    return (
        <div className={className} style={style}>
            {previewUrl ? (
                <div
                    className="w-full h-64 rounded"
                    style={{
                        ...imageStyle,
                        background: `url(${previewUrl}) no-repeat center`,
                        backgroundSize: 'cover',
                    }}
                    title={title}
                />
            ) : (
                ''
            )}

            <div className="dzu-previewStatusContainer flex flex-col justify-start absolute w-full h-48">
                {isUpload && (
                    <progress
                        max={100}
                        value={
                            status === 'done' ||
                            status === 'headers_received'
                                ? 100
                                : percent
                        }
                    />
                )}

                {status === 'uploading' && canCancel && (
                    <span
                        className="dzu-previewButton feather-x-circle"
                        onClick={cancel}
                    />
                )}
                {status !== 'preparing' &&
                    status !== 'getting_upload_params' &&
                    status !== 'uploading' &&
                    canRemove && (
                        <span
                            className="feather-x rounded-full h-9 w-9 px-2 py-1 text-center text-base cursor-pointer absolute right-1 top-1 bg-black text-white border-2 border-white font-bold"
                            onClick={remove}
                        />
                    )}
                {[
                    'error_upload_params',
                    'exception_upload',
                    'error_upload',
                    'aborted',
                    'ready',
                ].includes(status) &&
                    canRestart && (
                        <span
                            className="dzu-previewButton feather-refresh-cw"
                            onClick={restart}
                        />
                    )}
            </div>
        </div>
    )
}

type FileUploader = {
    accept: string
    addClassNames: Record<string, string>
    form_context?: {
        attributes: ModalDataAttributes
        setAttributes(data: Record<string, string | File>): void
    }
    onRemove?(): void
}

function FileInputComponent(props: IInputProps) {
    const {
        className,
        labelClassName,
        labelWithFilesClassName,
        style,
        labelStyle,
        labelWithFilesStyle,
        getFilesFromEvent,
        accept,
        multiple,
        disabled,
        content,
        withFilesContent,
        onFiles,
        files,
    } = props

    return (
        <label
            className={
                files.length > 0 ? labelWithFilesClassName : labelClassName
            }
            style={files.length > 0 ? labelWithFilesStyle : labelStyle}
        >
            {files.length > 0 ? (
                withFilesContent
            ) : (
                <div className="text-center text-base w-full h-64">
                    <div className="border-dashed border-2 rounded-lg p-3 h-48 flex flex-col gap-2 items-center justify-center">
                        <i className="feather-image text-5xl font-extralight" />
                        <p className="text-center text-primary">
                            Drag and drop image here or click to browse
                        </p>
                        <p className="leading-none text-center text-gray-300">
                            <small>
                                300x200 or higher recommended. Max 2MB
                            </small>
                            <br />
                            <small>Supports JPEG and PNG</small>
                        </p>
                    </div>
                    <div className="block h-3" />

                    <div className="flex gap-3 items-center bg-primary-light text-white px-6 py-3 rounded-lg w-full text-lg justify-center">
                        <i className="text-2xl leading-none feather-image" />
                        <span className="leading-snug">Upload Photo</span>
                    </div>
                </div>
            )}
            <input
                className={className}
                style={style}
                type="file"
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onChange={async (e) => {
                    const target = e.target
                    const chosenFiles = await getFilesFromEvent(e)
                    onFiles(chosenFiles)
                    //@ts-ignore
                    target.value = null
                }}
            />
        </label>
    )
}
export function ImageFileUploader(props: FileUploader) {
    function handleSubmit(
        clean_files: IFileWithMeta[],
        all_files: IFileWithMeta[]
    ) {
        console.log(clean_files, all_files)
    }

    function handleFileAdd(
        { file }: IFileWithMeta,
        status: StatusValue,
        files: IFileWithMeta[]
    ) {
        if (status == 'done') {
            props.form_context &&
                props.form_context.setAttributes({
                    ...props.form_context.attributes,
                    file,
                })
            console.log(file, status, files)
        }
    }
    return (
        <Dropzone
            {...props}
            multiple={false}
            maxFiles={1}
            onChangeStatus={handleFileAdd}
            submitButtonContent={
                <>
                    <i className="feather-image" />
                    <span>Upload Photo</span>
                </>
            }
            InputComponent={FileInputComponent}
            LayoutComponent={(l) => <ImageFileUploaderLayout {...l} />}
            PreviewComponent={(p) => (
                <ImageFileUploaderPreview
                    {...p}
                    className="border-dashed border-2 rounded-lg p-3 h-48 flex flex-col gap-2 items-center justify-center "
                />
            )}
        />
    )
}

export default ImageFileUploader
