import React, { useState } from 'react'
import VideoIntro from './VideoIntro'
import Banner from './Banner'
import Categories from './Categories'
import MallOutlets from './MallOutlets'
import Trends from './Trends'
import TrendingProducts from './TrendingProducts'
import DealsSection from './DealsSection'
import Features from './Features'
import Blogs from '../blogs/Blogs'

const Home = () => {
    const [introComplete, setIntroComplete] = useState(false)

    return (
        <>
            {/* Mall intro animation — shown once per visit */}
            {!introComplete && <VideoIntro onComplete={() => setIntroComplete(true)} />}

            {/* Main content fades in after intro */}
            <div
                className="transition-opacity duration-1000"
                style={{ opacity: introComplete ? 1 : 0 }}
            >
                <Banner />
                <MallOutlets />
                <Categories />
                <Trends />
                <TrendingProducts />
                <DealsSection />
                <Features />
                <Blogs />
            </div>
        </>
    )
}

export default Home
