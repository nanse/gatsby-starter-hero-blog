import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import Hero from "../components/Hero";
import Seo from "../components/Seo";

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

class IndexPage extends React.Component {
  separator = React.createRef();

  render() {
    const {
      data: {
        posts: { edges: posts = [] },
        bgDesktop: {
          resize: { src: desktop }
        },
        bgTablet: {
          resize: { src: tablet }
        },
        bgMobile: {
          resize: { src: mobile }
        },
        site: {
          siteMetadata: { facebook }
        }
      }
    } = this.props;

    const backgrounds = {
      desktop,
      tablet,
      mobile
    };

    return (
      <React.Fragment>
        <Parallax ref={ref => (this.parallax = ref)} pages={4}>
          <ParallaxLayer offset={0} speed={1} style={{ backgroundColor: "#999999", backgroundImage: `url(${backgrounds.desktop})`, backgroundSize: "cover", backgroundPosition: "center center" }} />
          <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: "#999999" }} />
          <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: "#805E73" }} />
          <ParallaxLayer offset={3} speed={1} style={{ backgroundColor: "#87BCDE" }} />

          <ParallaxLayer offset={2} speed={1} factor={3} style={{ backgroundImage: url("stars", true), backgroundSize: "cover" }} />

          <ParallaxLayer offset={2.3} speed={-0.3} style={{ pointerEvents: "none" }}>
            <img src={url("satellite4")} style={{ width: "15%", marginLeft: "70%" }} />
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={0.8} style={{ opacity: 0.1 }}>
            <img src={url("cloud")} style={{ display: "block", width: "20%", marginLeft: "55%" }} />
            <img src={url("cloud")} style={{ display: "block", width: "10%", marginLeft: "15%" }} />
          </ParallaxLayer>

          <ParallaxLayer offset={2.75} speed={0.5} style={{ opacity: 0.1 }}>
            <img src={url("cloud")} style={{ display: "block", width: "20%", marginLeft: "70%" }} />
            <img src={url("cloud")} style={{ display: "block", width: "20%", marginLeft: "40%" }} />
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={0.2} style={{ opacity: 0.2 }}>
            <img src={url("cloud")} style={{ display: "block", width: "10%", marginLeft: "10%" }} />
            <img src={url("cloud")} style={{ display: "block", width: "20%", marginLeft: "75%" }} />
          </ParallaxLayer>

          <ParallaxLayer offset={2.6} speed={-0.1} style={{ opacity: 0.4 }}>
            <img src={url("cloud")} style={{ display: "block", width: "20%", marginLeft: "60%" }} />
            <img src={url("cloud")} style={{ display: "block", width: "25%", marginLeft: "30%" }} />
            <img src={url("cloud")} style={{ display: "block", width: "10%", marginLeft: "80%" }} />
          </ParallaxLayer>

          <ParallaxLayer offset={3.6} speed={0.4} style={{ opacity: 0.6 }}>
            <img src={url("cloud")} style={{ display: "block", width: "20%", marginLeft: "5%" }} />
            <img src={url("cloud")} style={{ display: "block", width: "15%", marginLeft: "75%" }} />
          </ParallaxLayer>

          <ParallaxLayer offset={3.5} speed={-0.4} style={{ display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <img src={url("earth")} style={{ width: "60%" }} />
          </ParallaxLayer>

          <ParallaxLayer
            offset={3}
            speed={-0.3}
            style={{
              backgroundSize: "80%",
              backgroundPosition: "center",
              backgroundImage: url("clients", true)
            }}
          />

          <ParallaxLayer
            offset={0}
            speed={0.1}
            onClick={() => this.parallax.scrollTo(1)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ThemeContext.Consumer>
              {theme => (
                <Hero backgrounds={backgrounds} theme={theme} />
              )}
            </ThemeContext.Consumer>
          </ParallaxLayer>

          <hr ref={this.separator} />

          <ParallaxLayer
            offset={1}
            speed={0.1}
            onClick={() => this.parallax.scrollTo(2)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={url("server")} style={{ width: "20%" }} />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={0.1}
            onClick={() => this.parallax.scrollTo(3)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={url("bash")} style={{ width: "40%" }} />
          </ParallaxLayer>

          <ParallaxLayer
            offset={3}
            speed={-0}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => this.parallax.scrollTo(0)}>
            <img src={url("clients-main")} style={{ width: "40%" }} />
          </ParallaxLayer>
        </Parallax>
        <Seo facebook={facebook} />

        <style jsx>{`
          hr {
            margin: 0;
            border: 0;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*--/" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            category
            author
            description
            cover {
              children {
                ... on ImageSharp {
                  fluid(maxWidth: 800, maxHeight: 360) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    bgDesktop: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 1200, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgTablet: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 800, height: 1100, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgMobile: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 450, height: 850, quality: 90, cropFocus: CENTER) {
        src
      }
    }
  }
`;

//hero-background
