"use client"

import FormSelect from "@/components/Form/FormSelect";
import PageContainer from "@/components/Layout/PageContainer";
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function Home() {

  const { control, handleSubmit, setValue, watch, reset } = useForm({
    mode: 'onChange',
    defaultValues: {

    },
  });


  return (
    <PageContainer title="" description="">
      <div className="w-full h-max px-6 md:px-16 flex flex-col gap-16 ">
        <div className="w-full h-max relative overflow-hidden  pt-6 mdpt-[74px]">
          <div className="w-full inline-flex flex-col justify-start items-center gap-24">
            <div className="w-full flex flex-col justify-start items-center">
              <div className="h-16 px-4 py-5 inline-flex justify-center items-center gap-2.5">
                <div className="w-80 h-16 text-center justify-start">
                  <span className="text-white text-4xl md:text-6xl font-bold font-inria-sans leading-tight">
                    Touch
                  </span>
                  <span className="text-green-400 text-4xl md:text-6xl font-bold font-inria-sans leading-tight">
                    Grass
                  </span>
                </div>
              </div>
              <div className="self-stretch p-2.5 inline-flex justify-center items-center gap-2.5">
                <div className="text-center justify-start text-white text-2xl md:text-3xl font-normal font-inria-sans leading-tight">
                  Enough screen time. Let's log out together!.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="w-full h-max pt-[59px] pb-[142px] flex flex-col items-center justify-center rounded-[10px] outline outline-offset-[-1px] outline-white overflow-hidden">
          <div className="w-full md:w-3/5 px-4 md:px-0 flex flex-col items-center justify-center">
            <div className="w-full md:w-3/4 flex justify-center items-center">
              <div className=" flex justify-center items-center">
                <div className="w-14 h-14 relative overflow-hidden">
                  <img src="/images/icons/location.svg" className="w-7 h-11" />
                </div>

                <div className="w-full md:w-3/4">
                  <FormSelect
                    control={control}
                    name={'location'}
                    // label={'Select Locaton'}
                    placeholder={'Locaton'}
                    options={[]}
                    rules={{
                      // required: "Location is required",
                    }}
                    required
                  />
                </div>
                {/* <div className="w-full h-20 px-4 py-5 rounded-[10px] outline outline-offset-[-1px] outline-white flex justify-center items-center gap-2.5">
                <div className="text-center justify-start text-white text-3xl font-normal font-inter leading-tight">
                  Location
                </div>
                <div className="w-4 h-4 relative overflow-hidden">
                  <div className="w-2.5 h-1.5 bg-white" />
                </div>
              </div> */}
              </div>
            </div>



            <div className="w-full inline-flex flex-col justify-start items-center gap-1.5">
              <div className="w-72 p-2.5 flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch p-2.5 inline-flex justify-center items-center gap-2.5">
                  <div className="text-center justify-start text-white text-3xl font-normal font-happy-monkey leading-tight">
                    What you up to?
                  </div>
                </div>
              </div>
              <div className="self-stretch h-28 px-28 py-16 bg-white rounded-[30px] shadow-[9px_-2px_4px_0px_rgba(0,0,0,0.25)] outline outline-offset-[-1px] outline-white flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                <div className="self-stretch p-2.5 inline-flex justify-center items-center gap-2.5">
                  <div className="w-6 h-6 relative overflow-hidden">
                    <img src="/images/icons/game.svg" className="w-5 h-3.5" />
                  </div>
                  <div className="text-center justify-start text-black text-3xl font-normal font-happy-monkey leading-tight">
                    Gamings?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div data-type="Default" className="w-full h-max py-8 flex justify-between items-center relative overflow-hidden">

          <div className="w-10 h-10 md:w-20 md:h-20 inline-flex justify-start items-center gap-2.5">
            <div className="w-10 h-10 md:w-20 md:h-20 bg-green-700 rounded-full flex items-center justify-center" >
              <div className="w-6 h-6 relative overflow-hidden">
                <img src="/images/icons/home.svg" className="w-6 h-5" />
              </div>
            </div>
          </div>

          <div className="w-10 h-10 md:w-20 md:h-20 inline-flex justify-start items-center gap-2.5">
            <div className="w-10 h-10 md:w-20 md:h-20 bg-green-700 rounded-full flex items-center justify-center" >
              <div className="w-6 h-6 relative overflow-hidden">
                <img src="/images/icons/users.svg" className="w-6 h-5" />
              </div>
            </div>
          </div>

          <div className="w-10 h-10 md:w-20 md:h-20 inline-flex justify-start items-center gap-2.5">
            <div className="w-10 h-10 md:w-20 md:h-20 bg-green-700 rounded-full flex items-center justify-center" >
              <div className="w-6 h-6 relative overflow-hidden">
                <img src="/images/icons/add.svg" className="w-6 h-5" />
              </div>
            </div>
          </div>

          <div className="w-10 h-10 md:w-20 md:h-20 inline-flex justify-start items-center gap-2.5">
            <div className="w-10 h-10 md:w-20 md:h-20 bg-green-700 rounded-full flex items-center justify-center" >
              <div className="w-6 h-6 relative overflow-hidden">
                <img src="/images/icons/text.svg" className="w-6 h-5" />
              </div>
            </div>
          </div>

          <div className="w-10 h-10 md:w-20 md:h-20 inline-flex justify-start items-center gap-2.5">
            <div className="w-10 h-10 md:w-20 md:h-20 bg-green-700 rounded-full flex items-center justify-center" >
              <div className="w-6 h-6 relative overflow-hidden">
                <img src="/images/icons/user.svg" className="w-6 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
