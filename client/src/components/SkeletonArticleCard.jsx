import React from 'react'

export const SkeletonArticleCard = () => {
    console.log("SkeletonArticleCard");
  return (
<div>
      <article className="animate-pulse relative overflow-hidden rounded-2xl bg-gray-900 dark:bg-gray-700 px-8 py-8 pb-8 pt-48 h-96 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] shadow-slate-600 transition-transform duration-300 transform hover:scale-105">
        {/* image */}
        <div className='absolute inset-0 h-full w-full aspect-video bg-slate-300'/>

        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 z-0"></div>

      </article>
    </div>
  )
}


