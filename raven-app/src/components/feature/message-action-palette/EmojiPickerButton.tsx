import { lazy, useState, Suspense } from 'react'
import { Box, Flex, IconButton, Popover, Portal, Tooltip } from '@radix-ui/themes'
import { DIALOG_CONTENT_CLASS } from '@/utils/layout/dialog'
import { Smile } from 'lucide-react'
import { Loader } from '@/components/common/Loader'

const EmojiPicker = lazy(() => import('@/components/common/EmojiPicker/EmojiPicker'))

interface EmojiPickerButtonProps {
    saveReaction: (emoji: string) => void
}

export const EmojiPickerButton = ({ saveReaction }: EmojiPickerButtonProps) => {

    const [open, setOpen] = useState(false)

    const onClose = () => {
        setOpen(false)
    }

    const onEmojiClick = (emoji: string) => {
        saveReaction(emoji)
        onClose()
    }

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Flex>
                <Tooltip content='find another reaction'>
                    <Popover.Trigger>
                        <IconButton
                            variant='soft'
                            size='1'
                            color='gray'
                            aria-label='pick emoji'>
                            <Smile size='14' />
                        </IconButton>
                    </Popover.Trigger>
                </Tooltip>
                <Portal>
                    <Box className={'z-10'}>
                        <Popover.Content className={`${DIALOG_CONTENT_CLASS} p-0`}>
                            <Suspense fallback={<Loader />}>
                                <EmojiPicker onSelect={onEmojiClick} />
                            </Suspense>
                        </Popover.Content>
                    </Box>
                </Portal>
            </Flex>
        </Popover.Root>
    )
}