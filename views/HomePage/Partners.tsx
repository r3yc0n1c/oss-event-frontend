import NextImage from 'next/image';
import styled from 'styled-components';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from 'components/Container';
import { media } from 'utils/media';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

const PARTNER_LOGOS = [
  'logoipsum-logo-1.svg',
  'logoipsum-logo-2.svg',
  'logoipsum-logo-3.svg',
  'logoipsum-logo-4.svg',
  'logoipsum-logo-5.svg',
  'logoipsum-logo-6.svg',
  'logoipsum-logo-7.svg',
];

export default function Partners() {
  SwiperCore.use([Autoplay])
  return (
    <PartnersWrapper>
      <Title>Community partners</Title>
      <Swiper
        slidesPerView={5}
        centeredSlides={true}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
        speed={3000}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1025: { slidesPerView: 6 },
        }}
        modules={[Autoplay]}
        className="swiper-wrapper"
      >
        {PARTNER_LOGOS.map((logo) => (
          <SwiperSlide key={logo}>
            <NextImage src={`/static/partners/${logo}`} alt={normalizePartnerLogoName(logo)} width={128} height={128} />
          </SwiperSlide>
        ))}
      </Swiper>
    </PartnersWrapper>
  );
}

function normalizePartnerLogoName(logo: string) {
  return logo.replace('.svg', '');
}

const Title = styled.h3`
  font-size: 1.3rem;
  letter-spacing: 0.02em;
  line-height: 0;
  text-transform: uppercase;
  margin-bottom: 2rem;
  text-align: center;
  opacity: 0.8;
  color: #fbce1f;

  ${media('<=desktop')} {
    line-height: 1.5;
  }
`;

const PartnersWrapper = styled(Container)`
  .swiper-wrapper {
    will-change: transform;
    transition-timing-function: linear;
    margin-top: 0.5rem;
    user-select: none;
  }

  .swiper-slide {
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`;
