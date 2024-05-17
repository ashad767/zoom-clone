"use client"

import HomeCard from "./HomeCard"
import { useState } from "react"
import { useRouter } from "next/navigation"

const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    
    const router = useRouter();

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        
        <HomeCard header='New Meeting' subtext='Start an instant meeting' colour='bg-orange-1' image='/icons/add-meeting.svg' onclick={() => {setMeetingState('isJoiningMeeting')}}/>

        <HomeCard header='Schedule Meeting' subtext='Plan your meeting' colour='bg-blue-1' image='/icons/schedule.svg' onclick={() => {setMeetingState('isScheduleMeeting')}}/>

        <HomeCard header='View Recordings' subtext='Check out your recordings' colour='bg-purple-1' image='/icons/recordings.svg' onclick={() => {router.push('/recordings')}}/>

        <HomeCard header='Join Meeting' subtext='via invitation link' colour='bg-yellow-1' image='/icons/join-meeting.svg' onclick={() => {setMeetingState('isJoiningMeeting')}}/>

    </section>
  )
}

export default MeetingTypeList