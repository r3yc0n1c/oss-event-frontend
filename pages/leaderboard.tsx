import { Box } from '@mui/material';
import Fuse from 'fuse.js';
import { RiUserSearchLine } from "react-icons/ri";
import { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { media } from 'utils/media';
import LeaderboardTable from 'views/LeaderboardPage/LeaderboardTable';
import { modalState } from '../atoms/modalAtom';
import data from '../leaderBoard.json';
import { Contributor } from '../models/leaderboard.model';
import PRModal from '../views/LeaderboardPage/PRModal';
import TopThree from 'views/LeaderboardPage/TopThee';


export default function LeaderboardPage() {
  const isModalOpen = useRecoilValue(modalState);

  const [tableData, setTableData] = useState(data.leaderboardData.slice(3, data.leaderboardData.length));
  const [searchText, setSearchText] = useState('');
  const [searchedData, setSearchedData] = useState<Contributor[]>();

  const handleSearch = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchText(e.target.value);
    const fuse = new Fuse(tableData as Contributor[], {
      keys: ['full_name'],
      threshold: 0.2,
    });
    const result = fuse.search(e.target.value).map((item) => item.item);
    setSearchedData(result);
  };


  return (
    <Stack>
      <h2>
        Apertre'24 Leaderboard
      </h2>
      <p>
        Last updated on:
        <span>
          {new Date(data.lastUpdated).toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'full',
          })}
        </span>
      </p>


      <TopThree data={data.leaderboardData.slice(0, 3)} />

      <StyledBox>
        <Box sx={{ padding: '0 0.5rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>
          <RiUserSearchLine size={15} style={{marginRight: '0.8rem'}} />
          <SearchInput
            type="search"
            placeholder='Check your rank'
            value={searchText}
            onChange={handleSearch}
          />
        </Box>
        <LeaderboardTable data={searchText ? (searchedData as Contributor[]) : tableData} />
      </StyledBox>

      {isModalOpen && <PRModal />}
    </Stack>
  );
}


const Stack = styled.div`
  display: flex;
  flex-direction: column;
  
  ${media('<=tablet')} {
    
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 5rem 10rem 10rem 10rem;

  ${media('<=tablet')} {
    margin: 8rem 4rem;
  }
`

const SearchInput = styled.input`
  padding: 0.8rem;
  border: none;
  border-bottom: 1px solid rgba(var(--text));
  outline: none;
  width: 22%;
  background: none;
  color: rgba(var(--text));
  font-size: 1.4rem;
`;