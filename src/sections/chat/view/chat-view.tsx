import type { IChatParticipant } from 'src/types/chat';

import { useState, useEffect, useCallback } from 'react';

import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetContacts, useGetConversation, useGetConversations } from 'src/actions/chat';

import { EmptyContent } from 'src/components/empty-content';

import { useMockedUser } from 'src/auth/hooks';
import { Box, Button, Grid } from '@mui/material';
import { Layout } from '../layout';
import { ChatNav } from '../chat-nav';
import { ChatRoom } from '../chat-room';
import { ChatMessageList } from '../chat-message-list';
import { ChatMessageInput } from '../chat-message-input';
import { ChatHeaderDetail } from '../chat-header-detail';
import { ChatHeaderCompose } from '../chat-header-compose';
import { useCollapseNav } from '../hooks/use-collapse-nav';
import Sidebar from './Sidebar'
import Content from './Content'

import ExamTakeView from './exam-take-view';
// ----------------------------------------------------------------------

export function ChatView() {
  const router = useRouter();

  const { user } = useMockedUser();

  const { contacts } = useGetContacts();

  const searchParams = useSearchParams();

  const selectedConversationId = searchParams.get('id') || '';

  const [recipients, setRecipients] = useState<IChatParticipant[]>([]);

  const { conversations, conversationsLoading } = useGetConversations();

  const { conversation, conversationError, conversationLoading } = useGetConversation(
    `${selectedConversationId}`
  );

  const roomNav = useCollapseNav();

  const conversationsNav = useCollapseNav();

  const participants: IChatParticipant[] = conversation
    ? conversation.participants.filter(
        (participant: IChatParticipant) => participant.id !== `${user?.id}`
      )
    : [];

  useEffect(() => {
    if (conversationError || !selectedConversationId) {
      router.push(paths.dashboard.chat);
    }
  }, [conversationError, router, selectedConversationId]);

  const handleAddRecipients = useCallback((selected: IChatParticipant[]) => {
    setRecipients(selected);
  }, []);

  const [examStarted, setExamStarted] = useState(false);

  return (
    <>
    <DashboardContent
      maxWidth={false}
      sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}
    >
      <ExamTakeView/>
      {/* <Box m={4}>
        <Typography variant="h6">
          Dashboard
        </Typography>
        <Typography variant="h6">
          Welcome Back!
        </Typography>
      </Box>
      <Grid container spacing={1}>
        {
          examStarted == false 
          &&
          <Grid item xs={4} md={3}>
            <Sidebar/>
          </Grid>
        }
        <Grid item xs={8} md={9}>
          <Content/>
        </Grid>
        <Button variant='outlined' onClick={() => {setExamStarted(true)}}>
          Start Exam
        </Button>
        <Button variant='outlined' onClick={() => {setExamStarted(false)}}>
          End Exam
        </Button>
      </Grid> */}
    </DashboardContent>
    </>
  );
}
