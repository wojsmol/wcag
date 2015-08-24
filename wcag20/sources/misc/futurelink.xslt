<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	exclude-result-prefixes="xs"
	version="2.0">
	<xsl:include href="../xmlspec-wcag.xsl"/>
	<xsl:output method="text"/>
	
	<xsl:template match="/">		
		<xsl:apply-templates select="//item[contains(., 'future link')]"/>
	</xsl:template>
	
	<xsl:template match="item">
		<xsl:variable name="sc-num">
			<xsl:call-template name="sc-number">
				<xsl:with-param name="id" select="ancestor::div2/@id"/>
			</xsl:call-template>
		</xsl:variable>
		<xsl:text> [</xsl:text>
		<!-- <xsl:value-of select="$sc-num"/> -->
		<xsl:value-of select="ancestor::div2/head"/>
		<xsl:text>] </xsl:text>
		<xsl:value-of select="normalize-space(.)"/>
		<xsl:text>
</xsl:text>
	</xsl:template>
	
</xsl:stylesheet>