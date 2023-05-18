'use client';
import { useEffect, useState } from 'react';
import JournalEditor from './editor';
import { JournalT, ProjectT } from '@/lib/supabase/types/index.types';
import { OptionI } from '../projects/CTAs/relations.types';

export default function JournalEditorWrapper({
  categoriesProps,
  tagsProps,
  journalProps,
}: {
  journalProps?: JournalT | null;
  tagsProps:
    | {
        id: number;
        tag_name: string;
      }[]
    | null;
  categoriesProps:
    | {
        category_name: string;
        id: number;
      }[]
    | null;
}) {
  const [projectProperties, setCategories] = useState<{
    tags: readonly OptionI[];
    categories: readonly OptionI[];
  }>({
    tags: [],
    categories: [],
  });

  useEffect(() => {
    let groupedTags: OptionI[] = [];
    let groupedCategories: OptionI[] = [];

    if (tagsProps && categoriesProps) {
      for (let i = 0; i < tagsProps.length; i++)
        groupedTags.push({
          name: tagsProps[i].tag_name,
          value: `${tagsProps[i].id}.${tagsProps[i].tag_name}`,
          type: 'Tags',
        });

      for (let i = 0; i < categoriesProps?.length; i++)
        groupedCategories.push({
          name: categoriesProps[i].category_name,
          value: `${categoriesProps[i].category_name}`,
          type: 'Categories',
        });

      setCategories({
        tags: groupedTags,
        categories: groupedCategories,
      });
    }
  }, []);

  return (
    <JournalEditor
      journalProps={journalProps}
      tags={projectProperties?.tags}
      categories={projectProperties?.categories}
    />
  );
}
