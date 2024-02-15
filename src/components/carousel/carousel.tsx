import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Children, type ComponentProps, type FC, type PropsWithChildren } from 'react';

import '@splidejs/splide/dist/css/splide.min.css';
import { StyledCarouselContainer } from './carousel.styles';

const defaultSettings: ComponentProps<typeof Splide> = {
	options: {
		pagination: false,
		gap: '1rem',
		fixedWidth: '25vw',
		breakpoints: {
			768: {
				fixedWidth: '50vw',
			},
		},
	},
};

export const Carousel: FC<PropsWithChildren<ComponentProps<typeof Splide>>> = ({
	children,
	...settings
}) => {
	return (
		<StyledCarouselContainer>
			<Splide {...defaultSettings} {...settings}>
				{Children.map(children, (child, index) => {
					return <SplideSlide key={index}>{child}</SplideSlide>;
				})}
			</Splide>
		</StyledCarouselContainer>
	);
};
