import React from 'react'
import Paragraph from '../../UI/Typography/Paragraph'
import WrapperBGWidth from '../../common/WrapperBGWidth/WrapperBGWidth'

function TopHeadingSection() {
  return (
    <WrapperBGWidth background={'#10C87B'}>
        <div className='bg-[#10C87B]'>
        <Paragraph className='text-center text-white px-[30px] py-[6.5px] md:py-[12.5px] text-sm! leading-[14px]! md:text-base! lg:text-[20px]! lg:leading-[24px]!'>Set up your free profile and get seen by thousands of customers!</Paragraph>
        </div>
    </WrapperBGWidth>
  )
}

export default TopHeadingSection