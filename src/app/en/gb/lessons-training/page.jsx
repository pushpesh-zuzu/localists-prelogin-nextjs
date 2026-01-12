"use client";

import BannerWithBreadCrum from "@/app/component/category/ServicesHeroSection/BannerWithBreadCrum";
import LessonsAndTraining from "../../../component/level1/banner/LessonsAndTraining.webp";
import {
    LessionAndTrainingHowItWork, LessionAndTrainingPopularCategory
} from "@/constants/lessonAndTrainingData";
import SEO from "@/app/component/common/seo/SEO";
import HowItWorks from "@/app/component/category/howItWorks/CloneHowitWorks";
import PopularCategories from "@/app/component/category/popularCategories/ClonePopularCategories";
import AllServiceLevel1 from "@/app/component/category/allServices/AllServiceLevel1";
import GetQuotes from "@/app/component/common/GetQuotes/GetQuote";
import Footer from "@/app/component/Footer/Footer";
export default function Page() {

    return (
        <main className="bg-white">
            <SEO
                bannerImage={LessonsAndTraining}
                breadcrumb={[
                    { title: "Lessons & Training", path: "/en/gb/lessons-training" },
                ]}
                conversion
            />
            <BannerWithBreadCrum
                accountHeader=" Lessons & Training Services"
                level={2}
                isNeedS={false}
                panelImage={LessonsAndTraining}
                doYouNeetTitle={[
                    "Looking to develop",
                    "yourself or learn",
                    "a new skill",
                ]}
                title="Lessons & Training Services"
                para1="At Localists, we connect you with the right instructors and trainers to help you achieve your goals. Whether you’re looking to improve your skills, learn something new, or prepare for a big exam, we’ve got you covered. From academic tutoring and music lessons to fitness training, driving lessons, or professional development courses – there’s a local expert ready to guide you."
                para2="Not sure where to start? Simply tell us what type of training you need and your location.
 We’ll match you with trusted local professionals. Compare services, read verified reviews, and get free, no-obligation quotes tailored to your needs."
                para3="It’s quick, easy, and completely stress-free!"
                placeholderText="Tutoring, Piano Lessons, Driving Lessons etc..."
                inputLable1="Which type of lessons or training are you looking for?"
            />
            <HowItWorks
                howItWorksData={LessionAndTrainingHowItWork}
                ctaText={"Transport Services"}
            />
            <PopularCategories data={LessionAndTrainingPopularCategory} />
            <AllServiceLevel1
                data={[
                    {
                        name: "Tutors",
                        path: "/tutors-near-me",
                    },
                    {
                        name: "Physics And Maths Tutors",
                        path: "/physics-maths-tutors-near-me",
                    },
                ]}
            />

            <div className="mt-[5px]">
                <div
                    className="py-[50px] max-[768px]:py-[30px] max-[480px]:py-[20px]" >
                    <GetQuotes size="38px" ctaText="Lessons & Training" needSString={false} />
                </div>
            </div>
            <Footer />
        </main>
    );
}