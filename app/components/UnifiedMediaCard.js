 'use client';
 
 import React from 'react';
 import Image from 'next/image';
 
 /**
  * Reusable, consistent media card for Press / Events.
  * - Image on top, content below (title / description / meta / optional external link CTA)
  * - Whole card can be clickable (onOpen) without breaking CTA click.
  */
 export default function UnifiedMediaCard({
   imageSrc,
   imageAlt,
   title,
   description,
   metaLines = [],
   onOpen,
   externalHref,
   externalLabel = 'Linke git',
   externalVariant = 'default', // 'default' | 'youtube'
 }) {
   const isClickable = typeof onOpen === 'function';
   const cleanMeta = (metaLines || []).filter(Boolean);
 
   const ctaClasses =
     externalVariant === 'youtube'
       ? 'bg-red-600/90 hover:bg-red-600 ring-red-500/30'
       : 'bg-blue-600/90 hover:bg-blue-600 ring-blue-500/30';
 
   const Wrapper = isClickable ? 'article' : 'div';
 
   return (
     <Wrapper
       role={isClickable ? 'button' : undefined}
       tabIndex={isClickable ? 0 : undefined}
       onClick={isClickable ? onOpen : undefined}
       onKeyDown={
         isClickable
           ? (e) => {
               if (e.key === 'Enter' || e.key === ' ') {
                 e.preventDefault();
                 onOpen();
               }
             }
           : undefined
       }
       className={[
         'bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden',
         'transition-all duration-300',
         isClickable ? 'cursor-pointer hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20' : '',
         'group',
       ].join(' ')}
       aria-label={isClickable ? (title ? `${title} detayını aç` : 'Detayı aç') : undefined}
     >
       <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
         <Image
           src={imageSrc}
           alt={imageAlt || title || 'Görsel'}
           fill
           className="object-cover transition-transform duration-300"
           sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
         />
       </div>
 
       <div className="p-4">
         <div className="flex items-start justify-between gap-3">
           <h3 className="min-w-0 text-base font-semibold text-gray-900 leading-snug line-clamp-2">
             {title}
           </h3>
 
           {externalHref && externalHref !== '#' && (
             <a
               href={externalHref}
               target="_blank"
               rel="noopener noreferrer"
               onClick={(e) => e.stopPropagation()}
               className={[
                 'shrink-0 inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium text-white',
                 'ring-1 transition-colors',
                 ctaClasses,
               ].join(' ')}
             >
               {externalLabel}
             </a>
           )}
         </div>
 
         {description && (
           <p className="mt-2 text-sm text-gray-600 line-clamp-2">
             {description}
           </p>
         )}
 
         {cleanMeta.length > 0 && (
           <div className="mt-3 space-y-1">
             {cleanMeta.map((line, idx) => (
               <p key={idx} className="text-xs text-gray-500 line-clamp-1">
                 {line}
               </p>
             ))}
           </div>
         )}
       </div>
     </Wrapper>
   );
 }

