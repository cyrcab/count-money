  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { parseString } from 'xml2js';

  interface RssReaderProps {
    rssLink: string;
  }

  interface RssItem {
    title: string;
    link: string;
    pubDate: string;
  }

  const RssReader: React.FC<RssReaderProps> = ({ rssLink }) => {
    const [rssItems, setRssItems] = useState<RssItem[]>([]);

    useEffect(() => {
      const fetchRssData = async () => {
        try {
        const response = await axios.get(rssLink);
          const xmlData = response.data;

          parseString(xmlData, (err, result) => {
            if (err) {
              console.error('Error parsing XML:', err);
              return;
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const items = (result?.rss?.channel[0]?.item || []).map((item: any) => ({
              title: item.title[0] || '',
              link: item.link[0] || '',
              pubDate: item.pubDate[0] || '',
            }));

            setRssItems(items);
          });
        } catch (error) {
          console.error('Error fetching RSS data:', error);
        }
      };

      fetchRssData();
    }, [rssLink]);

    return (
      <div>
        <h2>RSS Reader</h2>
        <ul>
          {rssItems.map((item, index) => (
            <li key={index}>
              <strong>{item.title}</strong> - {item.pubDate}
              <br />
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default RssReader;
