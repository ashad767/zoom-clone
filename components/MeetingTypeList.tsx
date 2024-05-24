"use client"

import HomeCard from "./HomeCard"
import { useState } from "react"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient, Call } from "@stream-io/video-react-sdk"
import { useToast } from "./ui/use-toast"

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  })
  const [callDetails, setCallDetails] = useState<Call>()

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time"
        })
        return;
      }

      const id = crypto.randomUUID();

      const call = client.call('default', id);

      if (!call) throw new Error('Failed to create call')

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting'

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          },
        }
      })

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }

      toast({
        title: "Meeting Created"
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed to create meeting"
      })
    }
  }

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

      <HomeCard header='New Meeting' subtext='Start an instant meeting' colour='bg-orange-1' image='/icons/add-meeting.svg' onclick={() => { setMeetingState('isInstantMeeting') }} />

      <HomeCard header='Schedule Meeting' subtext='Plan your meeting' colour='bg-blue-1' image='/icons/schedule.svg' onclick={() => { setMeetingState('isScheduleMeeting') }} />

      <HomeCard header='View Recordings' subtext='Check out your recordings' colour='bg-purple-1' image='/icons/recordings.svg' onclick={() => { router.push('/recordings') }} />

      <HomeCard header='Join Meeting' subtext='via invitation link' colour='bg-yellow-1' image='/icons/join-meeting.svg' onclick={() => { setMeetingState('isJoiningMeeting') }} />

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        buttonIcon=""
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList