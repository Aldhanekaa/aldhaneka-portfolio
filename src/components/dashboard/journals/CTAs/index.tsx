'use client';
import React, { useState } from 'react';
import CTACard from '../../CTACard';
import CTAModal from '../../CTAModal';
import { CTAPropertiesT } from '../../CTAProperty';
import CategoriesModalContent from './categories';
import TagsModalContent from './tags';

const CTAInfo: CTAPropertiesT = {
  Categories: {
    title: 'Categories',
    btnName: 'Modify',
  },
  Tags: {
    title: 'Tags',
    btnName: 'Modify',
  },
  Analytics: {
    title: 'Analytics',
    btnName: 'See full',
  },
};

function broh() {
  return <div>hi</div>;
}

function FilterRendering({
  current,
  target,
  children,
}: {
  current: string;
  target: string;
  children: React.ReactNode;
}) {
  if (current != target) {
    return null;
  }

  return <>{children}</>;
}
export default function JournalsCTAs() {
  const [modalShown, setModalVisible] = useState('');

  const closeModal = () => {
    setModalVisible('');
  };

  return (
    <div>
      <div className="mt-10 grid grid-cols-9 gap-4">
        {Object.keys(CTAInfo).map((CTA, i) => (
          <CTACard
            key={i}
            title={CTAInfo[CTA].title}
            btnName={CTAInfo[CTA].btnName}
            onClick={() => {
              //   onClickCTA(CTA.content);
              setModalVisible(CTAInfo[CTA].title);
            }}
          />
        ))}
      </div>

      <CTAModal isModalShown={modalShown} onClose={closeModal}>
        <FilterRendering target={CTAInfo.Categories.title} current={modalShown}>
          <CategoriesModalContent />
        </FilterRendering>
        <FilterRendering target={CTAInfo.Tags.title} current={modalShown}>
          <TagsModalContent />
        </FilterRendering>
      </CTAModal>
    </div>
  );
}
